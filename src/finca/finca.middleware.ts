import { Injectable } from "@nestjs/common/decorators/core";
import { NestMiddleware } from "@nestjs/common/interfaces";
import { InjectModel } from "@nestjs/mongoose";
import { Finca } from "./schemas/finca.schema";
import { Model } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { Req, UnauthorizedException } from "@nestjs/common";
import { GuardPayload } from "./constantes";

@Injectable()
export class ValidarFincaUsuarioMiddleware implements NestMiddleware {

  constructor(
    @InjectModel(Finca.name) private fincaModelo: Model<Finca>,
  ) {}

  async use(req: Request, @Req() res:Response & GuardPayload, next: NextFunction) {
    const usuarioId = res.usuario._id;
    const fincaId = req.params.fincaId;

    if (!usuarioId || !fincaId) {
      throw new UnauthorizedException("Usuario o Finca no encontrada");
    }

    const autorizado = await this.fincaModelo.findOne({
      $and: [
        { _id: fincaId },
        {
          $or: [
            { _propietario: usuarioId },
            { colaboradores: { $in: usuarioId } },
          ]
        }
      ]
    }).populate('colaboradores');

    if (!autorizado) {
      throw new UnauthorizedException("Finca no encontrada o el usuario no pertenece a la finca");
    }

    next();
  }

}