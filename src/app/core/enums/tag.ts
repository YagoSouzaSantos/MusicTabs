export const tagType = {
  BEGINNER: 1,
  INTERMEDIATE: 2,
  ADVANCED: 3,
  EXPERT: 4
} as const

export declare type TagType = typeof tagType[keyof typeof tagType]
