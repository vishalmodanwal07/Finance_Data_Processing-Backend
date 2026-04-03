export const userRoleEnum = {
    ADMIN : "admin",
    VIEWER : "viewer",
    ANALYST : "analyst"
}

export const amountTypeEnum = {
    INCOME : "income",
    EXPENSE : "expense"
}
export const avaliableAmountType = Object.values(amountTypeEnum);
export const avaliableUserRole = Object.values(userRoleEnum);