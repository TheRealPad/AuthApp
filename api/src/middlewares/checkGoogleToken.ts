const checkGoogleToken = (req: any, res: any, next: any) => {
  const googleId = req.body.google_id;

  if (!googleId) {
    return res.status(401).json({ error: "Unauthorized - Missing Google Id" });
  }
  next();
};

export { checkGoogleToken };
