import { onchainTable, relations } from "ponder";

export const owner = onchainTable("owner", (t) => ({
  address: t.hex().primaryKey(),
}));

export const ownerRelations = relations(owner, ({ many }) => ({
  registryRecords: many(registryRecord),
}));

export const operator = onchainTable("operator", (t) => ({
  address: t.hex().primaryKey(),
}));

export const operatorRelations = relations(operator, ({ many }) => ({
  registryRecords: many(registryRecord),
}));


export const registryRecord = onchainTable("node", (t) => ({
  node: t.hex().primaryKey(),
  owner: t.hex().notNull(),
  operator: t.hex(),
  ttl: t.integer(),
}));

export const registryRecordRelations = relations(registryRecord, ({ one}) => ({
  owner: one(owner, {
    fields: [registryRecord.owner],
    references: [owner.address],
  }),
  operator: one(operator, {
    fields: [registryRecord.owner],
    references: [operator.address],
  }),
}));

export const resolver = onchainTable("resolver", (t) => ({
  address: t.hex().primaryKey(),
}));