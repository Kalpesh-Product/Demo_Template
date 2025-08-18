export const allowedOrigins = [
  "http://localhost:5173",
  "https://wono.co",
  "https://www.wono.co",
  "https://wononomadsfe.vercel.app",
];

export const corsConfig = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
