import { Rider } from "../entities/chessman/rider/rider";
import { Knight } from "../entities/chessman/knight/knight";
import { Bishop } from "../entities/chessman/bishop/bishop";
import { Queen } from "../entities/chessman/queen/queen";
import { King } from "../entities/chessman/king/king";
import { Pawn } from "../entities/chessman/pawn/pawn";

export const INITIALIZE_POSITION: Record<string, any> = {
  // black side = false
  a8: new Rider("assets/_r.png", false),
  b8: new Knight("assets/_n.png", false),
  c8: new Bishop("assets/_b.png", false),
  e8: new King("assets/_k.png", false),
  d8: new Queen("assets/_q.png", false),
  f8: new Bishop("assets/_b.png", false),
  g8: new Knight("assets/_n.png", false),
  h8: new Rider("assets/_r.png", false),
  a7: new Pawn("assets/_p.png", false),
  b7: new Pawn("assets/_p.png", false),
  c7: new Pawn("assets/_p.png", false),
  d7: new Pawn("assets/_p.png", false),
  e7: new Pawn("assets/_p.png", false),
  f7: new Pawn("assets/_p.png", false),
  g7: new Pawn("assets/_p.png", false),
  h7: new Pawn("assets/_p.png", false),
  // white side = true
  a1: new Rider("assets/R.png", true),
  b1: new Knight("assets/N.png", true),
  c1: new Bishop("assets/B.png", true),
  d1: new Queen("assets/Q.png", true),
  e1: new King("assets/K.png", true),
  f1: new Bishop("assets/B.png", true),
  g1: new Knight("assets/N.png", true),
  h1: new Rider("assets/R.png", true),
  a2: new Pawn("assets/P.png", true),
  b2: new Pawn("assets/P.png", true),
  c2: new Pawn("assets/P.png", true),
  d2: new Pawn("assets/P.png", true),
  e2: new Pawn("assets/P.png", true),
  f2: new Pawn("assets/P.png", true),
  g2: new Pawn("assets/P.png", true),
  h2: new Pawn("assets/P.png", true),
};
