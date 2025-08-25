import pollModel from "../Models/Poll.Schema/Poll.Schema.js";

export const resolvers = {
  Query: {
    // get all polls
    getAllPolls: async () => {
      try {
        return await pollModel.find();
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch polls");
      }
    },

    // get poll by id
    getPollById: async (_: any, { id }) => {
      try {
        const pollById = await pollModel.findById(id)
        if (!pollById) {
          throw new Error("poll is found with this id")
        }
        return pollById
      } catch (error) {
        console.log("Error while fetching the poll by id ")
        throw error
      }
    }
  },

  Mutation: {
    // Create poll
    createPoll: async (_: any, { input }) => {
      console.log("input data", input)

      // verify the quetion already present
      const isQuetionPresent = await pollModel.findOne({ question: input.question })
      if (isQuetionPresent) {
        throw new Error("Quetion is already present")
      }

      // create poll
      const newPoll = await pollModel.create({
        ...input,
      })

      return newPoll
    },

    // delete poll 
    deletePoll: async (_: any, { id }) => {
      console.log("id comes for delete", id)

      // validate the id is comes from the user
      const isIdPresent = await pollModel.findById(id)
      console.log("isIdPresent", isIdPresent)
      if (!isIdPresent) {
        throw new Error("poll is not found whith this id ")
      }

      // Delete the poll 
      const deletePoll = await pollModel.findByIdAndDelete(id)

      return deletePoll

    }

  }
};
