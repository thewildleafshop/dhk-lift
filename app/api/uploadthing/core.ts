import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  documentUploader: f({
    pdf: { maxFileSize: "16MB", maxFileCount: 5 },
    image: { maxFileSize: "8MB", maxFileCount: 5 },
  })
    .middleware(async () => {
      try {
        const session = await auth();
        if (session?.user) {
          return { userId: (session.user as any).id || "guest" };
        }
      } catch (err) {
        console.log("Session error in documentUploader:", err);
      }
      return { userId: "guest" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Document uploaded:", file.url, "by user:", metadata.userId);
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  storyImageUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      try {
        const session = await auth();
        if (session?.user) {
          return { userId: (session.user as any).id || "guest" };
        }
      } catch (err) {
        console.log("Session error in storyImageUploader:", err);
      }
      return { userId: "guest" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Story image uploaded:", file.url);
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  evidenceUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 10 },
    pdf: { maxFileSize: "16MB", maxFileCount: 10 },
  })
    .middleware(async () => {
      try {
        const session = await auth();
        if (session?.user) {
          return { userId: (session.user as any).id || "guest" };
        }
      } catch (err) {
        console.log("Session error in evidenceUploader:", err);
      }
      return { userId: "guest" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Evidence uploaded:", file.url);
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;