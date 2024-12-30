export const selectDataTestIdPrefix = {
    MC: "MC-select-option-",
    Tournament: "Tournament-select-option-",
}

export type SelectCategory = keyof typeof selectDataTestIdPrefix;