import { ponder} from "ponder:registry";
import { registryRecord, owner, resolver } from "ponder:schema";

ponder.on('registry:NewOwner', async ({ context, event, 
}) => {
  const ownerEntity = await context.db.insert(owner).values({
    address: event.args.owner,
  }).onConflictDoNothing();
});

ponder.on('registry:Transfer', async ({ context, event, 
}) => {


  const ownerEntity = await context.db.insert(owner).values({
    address: event.args.owner,
  }).onConflictDoNothing();
  
  const registryRecordEntity = await context.db.insert(registryRecord).values({
    node: event.args.node,
    owner: event.args.owner,
  }).onConflictDoUpdate((row) => ({
    owner: event.args.owner,
  }))
});