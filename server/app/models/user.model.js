module.exports = mongoose => {
    const Users = mongoose.model(
      "users",
      mongoose.Schema(
        {
          username: String,
          email: String,
          password: String,
          note: String,
          role: String,
          preferite: Array
        },
        { timestamps: true }
      )
    );
    return Users;
  };
