import { Record } from "../models/record.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

// Create Record
const createRecord = asyncHandler(async (req, res) => {
  const { amount, type, category, date, notes } = req.body;

   const record = await Record.create({
    amount,
    type,
    category,
    date,
    notes,
    createdBy: req.user._id,
  });

  return res.status(201).json(
    new ApiResponse(201, record, "Record created successfully")
  );
});

// Update record
const updateRecord = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { amount, type, category, date, notes } = req.body;

  const record = await Record.findById(id);
  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  if (
    req.user.role === "analyst" &&
    record.createdBy.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(403, "You can only edit your own record");
  }

  const updates = { amount, type, category, date, notes };

  Object.keys(updates).forEach((key) => {
    if (updates[key] !== undefined) {
      record[key] = updates[key];
    }
  });

  await record.save();

  return res.status(200).json(
    new ApiResponse(200, record, "Record updated successfully")
  );
});

//soft delete
const deleteRecord = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const record = await Record.findById(id);
  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  record.deletedAt = new Date();
  await record.save();

  return res.status(200).json(
    new ApiResponse(200, null, "Record deleted successfully")
  );
});

// GET SINGLE RECORD
const getRecord = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const record = await Record.findById(id).populate(
    "createdBy",
    "name email"
  );

  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  return res.status(200).json(
    new ApiResponse(200, record, "Record fetched successfully")
  );
});

// GET ALL RECORDS (INDEX OPTIMIZED)
const getAllRecords = asyncHandler(async (req, res) => {
  const { type, category, from, to, page = 1, limit = 20 } = req.query;

  const filter = {
    createdBy: req.user._id,
  };

  if (type) filter.type = type;
  if (category) filter.category = category;

  if (from || to) {
    filter.date = {};
    if (from) filter.date.$gte = new Date(from);
    if (to) filter.date.$lte = new Date(to);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [records, total] = await Promise.all([
    Record.find(filter)
      .populate("createdBy", "name email")
      .sort({ date: -1 })
      .skip(skip)
      .limit(Number(limit)),

    Record.countDocuments(filter),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        records,
      },
      "All records fetched successfully"
    )
  );
});

export {
  createRecord,
  updateRecord,
  deleteRecord,
  getRecord,
  getAllRecords,
};