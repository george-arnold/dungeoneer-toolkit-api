module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://dunder_mifflin@localhost/dungeoneer-toolkit",
  JWT_SECRET: process.env.JWT_SECRET || "53b9ec99-f11d-4ca6-a1cf-ccd53a8ee6c8",
};
