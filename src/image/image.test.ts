import { describe, it, expect } from "vitest";
import { recommendFormat } from "./codecs/smartRecommender";
import { queueManager } from "./queue/queueManager";
import { ImageJob } from "./types";

describe("Smart Format Recommender", () => {
  it("should recommend PNG for screenshots", () => {
    const rec = recommendFormat("png", 1920, 1080, false, "screenshot-2026.png");
    expect(rec.recommendedFormat).toBe("png");
  });

  it("should recommend WebP for transparent images", () => {
    const rec = recommendFormat("png", 800, 600, true, "logo_transparent.png");
    expect(rec.recommendedFormat).toBe("webp");
  });

  it("should recommend AVIF for high-resolution photos", () => {
    const rec = recommendFormat("jpeg", 3840, 2160, false, "camera_photo.jpg");
    expect(rec.recommendedFormat).toBe("avif");
  });
});

describe("Queue Manager", () => {
  it("should add and update image jobs reactively", () => {
    const dummyJob: ImageJob = {
      id: "job-1",
      file: new File([], "test.png"),
      name: "test.png",
      originalFormat: "PNG",
      originalSize: 1024,
      width: 100,
      height: 100,
      aspectRatio: "1:1",
      hasAlpha: true,
      originalDataUrl: "data:image/png;base64,",
      targetFormat: "webp",
      targetQuality: 85,
      targetWidth: 100,
      targetHeight: 100,
      keepMetadata: false,
      backgroundColor: "transparent",
      status: "idle",
      progress: 0,
    };

    queueManager.clearAll();
    queueManager.addJobs([dummyJob]);
    expect(queueManager.getJobs().length).toBe(1);

    queueManager.updateJob("job-1", { status: "completed", progress: 100 });
    expect(queueManager.getJobs()[0].status).toBe("completed");

    queueManager.clearCompleted();
    expect(queueManager.getJobs().length).toBe(0);
  });
});
