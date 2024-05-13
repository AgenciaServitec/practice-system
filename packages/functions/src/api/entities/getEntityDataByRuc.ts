import { NextFunction, Request, Response } from "express";
import { getCompanyDataByRuc } from "../../client-api/apis-net-pe";

interface Params {
  ruc: string;
}

export const getEntityDataByRuc = async (
  req: Request<Params, unknown, unknown, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    params: { ruc },
  } = req;

  console.log("「Get company data」Initialize", ruc, {
    params: req.params,
  });

  try {
    const entityData = await getCompanyDataByRuc({ ruc: ruc });

    res.send(entityData).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
