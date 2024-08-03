import {User} from "./user";


const ensureCollections = async () => {
  await User.createIndexes();

  await User.findOne();
};

export default ensureCollections;