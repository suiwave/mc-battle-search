import type { Battle } from "@/types/tables"

export const convertFriendlyTime = (time: number) => {
    return `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`
}

export const convertFriendlyMatchLabel = (battle: Battle) => {
    // ソロラップの場合もある
    if (battle.mc2 === null) {
        return battle.mc1
    }
    return `${battle.mc1} vs ${battle.mc2}`
}