import { Router } from "express";
import { Bike } from "./model";

const bikesRouter = Router();

// create -> add one by only by admin
bikesRouter.post("/", requireAuth({ isAdmin: true }), async (req, res) => {
  const data = req.body;

  const bike = await Bike.create(data);

  return res.status(200).json({ Message: "Bike created successfully", bike });
});

// read
// get all the bikes

bikesRouter.get("/", async (req, res) => {
  const bikes = await Bike.find();
  return bikes;
});

// get one bike by bike id

bikesRouter.get("/:bikeId", async (req, res) => {
  const bikeId = req.params.bikeId;

  const bike = await Bike.findById(bikeId);

  return bike;
});

// update by admin using given id
bikesRouter.put("/:bikeId", async (req, res) => {
  const bikeId = req.params.bikeId;
  const data = req.body;

  const bike = await Bike.findByIdAndUpdate(bikeId, data);

  return bike;
});

// delete by admin using bike id
bikesRouter.delete(
  "/:bikeId",
  requireAuth({ isAdmin: true }),
  async (req, res) => {
    const bikeId = req.params.bikeId;

    const bike = await Bike.findByIdAndDelete(bikeId);

    return bike;
  },
);

export { bikesRouter };
