// services/redis.service.js

const setKey = async (redis, key, value) => {
  await redis.set(key, value);
};

const getKey = async (redis, key) => {
  return await redis.get(key);
};

const updateKey = async (redis, key, value) => {
  await redis.set(key, value);
};

const deleteKey = async (redis, key) => {
  await redis.del(key);
};

module.exports = {
  setKey,
  getKey,
  updateKey,
  deleteKey
};
