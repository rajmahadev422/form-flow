import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Use "next/link" if you are utilizing Next.js
import { useAuth } from "../utils/useAuth.js";
import { BarWaveLoader } from "./Loader.jsx";
// Mock Data structure mirroring a live responses database schema
const mockFeedbacks = [
  {
    id: "1",
    rating: 5,
    comment:
      "The form builder is incredibly snappy. The dynamic Cloudinary file uploading component works perfectly out of the box!",
    date: "2026-06-02T10:30:00Z",
  },
  {
    id: "2",
    rating: 4,
    comment:
      "Very polished spreadsheet UI design. It would be amazing if we could live-edit cells directly inside the table view in a future release.",
    date: "2026-06-01T15:45:00Z",
  },
  {
    id: "3",
    rating: 5,
    comment:
      "Excellent responsiveness on mobile. The Excel downloading module works flawlessly without generating any vulnerability audits.",
    date: "2026-05-31T08:12:00Z",
  },
  {
    id: "4",
    rating: 3,
    comment:
      "Good UI elements overall, but I noticed some form title text overlaps slightly on very narrow mobile viewports before clipping.",
    date: "2026-05-30T19:20:00Z",
  },
  {
    id: "5",
    rating: 2,
    comment:
      "The client-side signature collection works, but exposing the raw public unsigned upload preset string gives me some minor security concerns.",
    date: "2026-05-28T11:05:00Z",
  },
];

export default function ShowFeedback() {
  // const [feedbacks] = useState(mockFeedbacks);

  const {getFeedback, feedbacks, feedLoad} = useAuth();

  useEffect(() => {
    if(!feedbacks) getFeedback();
  }, []);

  if(feedLoad || !feedbacks) return <BarWaveLoader />

  // Compute live analytical scores
  const totalReviews = feedbacks.length;
  const averageRating = (
    feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews
  ).toFixed(1);

  // Calculate distributions for the structural analytics graph bars
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  feedbacks.forEach((f) => ratingCounts[f.rating]++);

  // Star Component Render helper
  const RenderStars = ({ count, size = "sm" }) => {
    return (
      <div
        className={`flex items-center gap-0.5 select-none ${size === "lg" ? "text-2xl" : "text-sm"}`}
      >
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={
              index < count
                ? "text-amber-400 font-sans"
                : "text-(--border) dark:text-gray-700 font-sans"
            }
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-16 bg-(--bg) min-h-screen">
      {/* Header Context Segment */}
      <div className="no-print mb-8">
        <Link
          to="/dashboard"
          className="text-(--text-3) text-xs no-underline inline-flex items-center gap-1 mb-2 hover:text-(--text) transition-colors"
        >
          ← Dashboard Workspace
        </Link>
        <h1 className="font-['DM_Serif_Display',serif] text-3xl text-(--text) m-0 tracking-wide">
          User Insights & Reviews
        </h1>
        <p className="text-(--text-2) text-sm m-0 mt-1">
          Reviewing incoming performance feedback metrics from live production
          respondents.
        </p>
      </div>

      {/* Grid Summary Dashboard Block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Left Card Segment: Big Average Score Box */}
        <div className="bg-(--surface) border border-(--border) rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xs">
          <span className="text-xs font-bold text-(--text-3) uppercase tracking-widest mb-1">
            Average Score
          </span>
          <span className="text-5xl font-extrabold text-(--text) font-mono tracking-tighter mb-2">
            {averageRating}
          </span>
          <RenderStars count={Math.round(averageRating)} size="lg" />
          <span className="text-xs text-(--text-2) mt-3 font-medium">
            Based on {totalReviews} live submissions
          </span>
        </div>

        {/* Right Card Segment: Graphic Rating Breakdown Progression Bars (Spans 2 columns) */}
        <div className="bg-(--surface) border border-(--border) rounded-2xl p-6 md:col-span-2 shadow-xs flex flex-col justify-center gap-2.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const currentCount = ratingCounts[star] || 0;
            const percentage =
              totalReviews > 0 ? (currentCount / totalReviews) * 100 : 0;

            return (
              <div
                key={star}
                className="flex items-center gap-4 text-xs font-medium"
              >
                <span className="w-3 text-right text-(--text-2) font-mono">
                  {star}
                </span>
                <span className="text-amber-400 text-sm select-none">★</span>

                {/* Horizontal Bar track container */}
                <div className="flex-1 h-2 bg-(--bg-2) rounded-full overflow-hidden relative border border-(--border)/20">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="w-12 text-left text-(--text-3) font-mono">
                  {currentCount} ({Math.round(percentage)}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Comment Response Feed Area */}
      <h3 className="text-base font-bold text-(--text) uppercase tracking-wider mb-4 border-b border-(--border)/40 pb-2 flex items-center gap-2">
        📥 Detailed Submissions{" "}
        <span className="text-xs bg-(--bg-2) text-(--text-3) border border-(--border) px-2 py-0.5 rounded-full font-mono font-normal">
          {totalReviews}
        </span>
      </h3>

      <div className="flex flex-col gap-4">
        {feedbacks.map((item, index) => (
          <div
            key={item.id}
            className="bg-(--surface) border border-(--border) rounded-xl p-5 md:p-6 flex flex-col gap-3.5 fade-up transition-all hover:border-(--accent)/30"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Review Card Header Row */}
            <div className="flex justify-between items-start flex-wrap gap-2">
              {/* Dynamic Badging Score container */}
              <div className="bg-(--bg-2) border border-(--border) px-3 py-1.5 rounded-lg flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold font-mono text-(--text-2)">
                  {item.rating} / 5
                </span>
                <RenderStars count={item.rating} />
              </div>
            </div>

            {/* Description Paragraph Container */}
            <p className="text-sm text-(--text-2) leading-relaxed m-0 bg-(--bg-2)/40 border border-(--border)/30 rounded-lg p-3.5 italic font-medium text-pretty">
              "{item.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
