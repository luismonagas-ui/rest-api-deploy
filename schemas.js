/** @format */
const z = require('zod');

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title muct be a string',
    required_error: 'Movie title is required',
  }),
  year: z.number().int().positive().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid URL',
  }),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Comedy',
      'Crime',
      'Drama',
      'Fantasy',
      'Horror',
      'Thriller',
      'Sci - fi',
      'Documentary',
    ]),
    {
      required_error: 'Movie genre es required',
      invalid_type_error: 'Movie genre must be an array of enum Genre',
    }
  ),
});

function validateMovie(input) {
  return movieSchema.safeParse(input);
}

function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input);
}

module.exports = { validateMovie, validatePartialMovie };
