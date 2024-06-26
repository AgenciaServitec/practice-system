import * as admin from "firebase-admin";

export type CurrencyCode = "PEN" | "USD";

export interface DocumentCreate {
  createAt: admin.firestore.Timestamp;
  updateBy: string;
  isDeleted?: boolean; // only false;
}

export interface DocumentUpdate {
  updateAt: admin.firestore.Timestamp;
  updateBy: string;
}

export interface DocumentDelete {
  updateAt: admin.firestore.Timestamp;
  updateBy: string;
  isDeleted?: boolean; // only true;
}

export interface _Image {
  createAt: admin.firestore.Timestamp;
  name: string;
  uid: string;
  url: string;
  thumbUrl?: string;
}

export type ApiToFirestore<T> = {
  [P in keyof T]: T[P] extends Date ? admin.firestore.Timestamp : T[P];
};

export type Image = Omit<_Image, "createAt"> & { createAt: Date };
