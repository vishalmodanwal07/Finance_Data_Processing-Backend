import { Record } from "../models/record.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const getSummary = asyncHandler(async (req, res) => {
  const { from, to } = req.query;

  // Date filter
  const dateFilter = {};
  if (from) dateFilter.$gte = new Date(from);
  if (to) dateFilter.$lte = new Date(to);

  // Match condition
  const match = {
    deletedAt: null,
    ...(Object.keys(dateFilter).length && { date: dateFilter }),
  };

  const [totals, byCategory, monthlyTrend, recent] = await Promise.all([
    
    // Total income & expense
    Record.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]),

    // Category-wise breakdown
    Record.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            category: "$category",
            type: "$type",
          },
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
      {
        $project: {
          category: "$_id.category",
          type: "$_id.type",
          total: 1,
          count: 1,
          _id: 0,
        },
      },
    ]),

    //  Monthly trend
    Record.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]),

    // Recent 5 records
    Record.find(match)
      .sort({ date: -1 })
      .limit(5)
      .populate("createdBy", "name"),
  ]);

  // Extract totals
  const income = totals.find((t) => t._id === "income")?.total ?? 0;
  const expense = totals.find((t) => t._id === "expense")?.total ?? 0;

  const incomeCount =
    totals.find((t) => t._id === "income")?.count ?? 0;
  const expenseCount =
    totals.find((t) => t._id === "expense")?.count ?? 0;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        summary: {
          totalIncome: income,
          totalExpense: expense,
          netBalance: income - expense,
          recordCounts: {
            income: incomeCount,
            expense: expenseCount,
          },
        },
        byCategory,
        monthlyTrend,
        recentActivity: recent,
      },
      "All Dashboard data fetched successfully"
    )
  );
});

export { getSummary };