module.exports = mongoose => {
    const Info = mongoose.model(
      "info",
      mongoose.Schema(
        {
          name: String,
          surname: String,
          image: String,
          birthdate: String,
          citizenship: String,
          genres: String,
          history: String,
        },
        { timestamps: true }
      ).index({name :'text', history: 'text'})
    )
    return Info;
  };

