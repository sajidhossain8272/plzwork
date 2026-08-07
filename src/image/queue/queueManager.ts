import { ImageJob, ImageFormat } from "../types";

type QueueListener = (jobs: ImageJob[]) => void;

class QueueManager {
  private jobs: ImageJob[] = [];
  private listeners: Set<QueueListener> = new Set();

  public subscribe(listener: QueueListener): () => void {
    this.listeners.add(listener);
    listener([...this.jobs]);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    const copy = [...this.jobs];
    for (const listener of this.listeners) {
      listener(copy);
    }
  }

  public getJobs(): ImageJob[] {
    return [...this.jobs];
  }

  public addJobs(newJobs: ImageJob[]): void {
    this.jobs.push(...newJobs);
    this.notify();
  }

  public updateJob(id: string, updates: Partial<ImageJob>): void {
    const job = this.jobs.find((j) => j.id === id);
    if (job) {
      Object.assign(job, updates);
      this.notify();
    }
  }

  public removeJob(id: string): void {
    this.jobs = this.jobs.filter((j) => j.id !== id);
    this.notify();
  }

  public clearCompleted(): void {
    this.jobs = this.jobs.filter((j) => j.status !== "completed");
    this.notify();
  }

  public clearAll(): void {
    this.jobs = [];
    this.notify();
  }

  public setGlobalFormat(format: ImageFormat): void {
    for (const job of this.jobs) {
      job.targetFormat = format;
    }
    this.notify();
  }

  public setGlobalQuality(quality: number): void {
    for (const job of this.jobs) {
      job.targetQuality = quality;
    }
    this.notify();
  }

  public setGlobalDimensions(widthPercent: number): void {
    for (const job of this.jobs) {
      const scale = widthPercent / 100;
      job.targetWidth = Math.round(job.width * scale);
      job.targetHeight = Math.round(job.height * scale);
    }
    this.notify();
  }

  public applyProfile(format: ImageFormat, width?: number, height?: number, quality?: number): void {
    for (const job of this.jobs) {
      job.targetFormat = format;
      if (width) job.targetWidth = width;
      if (height) job.targetHeight = height;
      if (quality) job.targetQuality = quality;
    }
    this.notify();
  }
}

export const queueManager = new QueueManager();
