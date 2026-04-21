-- Per-guide pricing for each trek route in the catalog
CREATE TABLE "GuideRouteRate" (
    "id" TEXT NOT NULL,
    "guideId" TEXT NOT NULL,
    "trekRouteId" TEXT NOT NULL,
    "ratePerDay" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "GuideRouteRate_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "GuideRouteRate_guideId_trekRouteId_key" ON "GuideRouteRate"("guideId", "trekRouteId");

CREATE INDEX "GuideRouteRate_guideId_idx" ON "GuideRouteRate"("guideId");
CREATE INDEX "GuideRouteRate_trekRouteId_idx" ON "GuideRouteRate"("trekRouteId");

ALTER TABLE "GuideRouteRate" ADD CONSTRAINT "GuideRouteRate_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "GuideRouteRate" ADD CONSTRAINT "GuideRouteRate_trekRouteId_fkey" FOREIGN KEY ("trekRouteId") REFERENCES "TrekRoute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
