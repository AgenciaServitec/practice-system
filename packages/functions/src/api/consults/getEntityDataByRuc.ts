import { NextFunction, Request, Response } from "express";
import { getCompanyDataByRuc } from "../../client-api/apis-net-pe";
import { isEmpty } from "lodash";

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

    if (isEmpty(entityData)) {
      res.status(412).send("consults/not_found_entity_by_ruc").end();
      return;
    }

    res.send(entityData).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
