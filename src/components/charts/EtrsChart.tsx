import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { ChartConfig, ChartContainer } from "../ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  PartRow,
  partRows,
  PartRowWithReleaseDate,
} from "../../services/data/dashboardData";
import InfoDialog from "../info/InfoDialog";
import EtrsTrackerInfo from "../info/EtrsTrackerInfo";

function dateToNumber(date: string) {
  return new Date(date).getTime();
}

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function offsetFromDate(
  startingDate: Date,
  days: number,
  offset: "add" | "subtract"
) {
  const modifier = offset === "add" ? 1 : -1;
  const offsetDate = new Date(startingDate);
  offsetDate.setDate(offsetDate.getDate() + modifier * days);
  const year = offsetDate.getFullYear();
  const month = String(offsetDate.getMonth() + 1).padStart(2, "0");
  const day = String(offsetDate.getDate()).padStart(2, "0");
  const date = `${year}-${month}-${day}`;
  return date;
}

const today = new Date();
const SopDate = new Date(today.setDate(today.getDate() + 1));
const SopDateString = offsetFromDate(SopDate, 0, "add");

function getReleaseDates(data: PartRow[]) {
  const dataWithDates = data.map((d) => {
    const releaseDate = offsetFromDate(
      SopDate,
      d.leadTimeWeeks * 7,
      "subtract"
    );
    return { ...d, releaseDate };
  });
  return dataWithDates;
}

// Add SOP date to array so data point on graph exists and the reference line is shown
const sortedData = partRows.sort((a, b) => a.leadTimeWeeks - b.leadTimeWeeks);

function countReleaseDates(data: PartRowWithReleaseDate[]) {
  const dateCountMap = {} as { [key: string]: number };
  data.forEach((item) => {
    const date = item.releaseDate;
    dateCountMap[date] = (dateCountMap[date] || 0) + 1;
  });
  return Object.entries(dateCountMap).map(([releaseDate, count]) => ({
    releaseDate,
    count,
  }));
}

const dataWithDates: PartRowWithReleaseDate[] = getReleaseDates(sortedData);
let releasesPerDate = [
  ...countReleaseDates(dataWithDates),
  { releaseDate: SopDateString, count: 0 },
].sort(
  (a, b) =>
    new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
);

const firstReleaseDate =
  releasesPerDate[releasesPerDate.length - 1].releaseDate;

releasesPerDate = [
  {
    releaseDate: offsetFromDate(new Date(firstReleaseDate), 120, "subtract"),
    count: 0,
  },
  ...releasesPerDate,
  {
    releaseDate: offsetFromDate(new Date(SopDateString), 7, "add"),
    count: 0,
  },
];

let cumulativeReleases = 0;
const cumulativeReleasesPerDate = releasesPerDate.map((d) => {
  cumulativeReleases = cumulativeReleases + d.count;
  return { ...d, cumulativeReleases };
});

const plotData = cumulativeReleasesPerDate.map((item) => {
  return {
    ...item,
    releaseDate: dateToNumber(item.releaseDate),
  };
});

export default function EtrsChart() {
  return (
    <Card className="h-fit grow xl:max-w-1/2">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-4 items-center">
              ETRS TRACKER
            </div>
            <InfoDialog
              title="ETRS Chart Information"
              description="About the ETRS Chart."
            >
              <EtrsTrackerInfo />
            </InfoDialog>
          </div>
        </CardTitle>
        <CardDescription>Part Release Forecast</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            data={plotData}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="releaseDate"
              type="number"
              domain={["dataMin", "dataMax"]}
              tickMargin={9}
              tickCount={12}
              tickFormatter={(timestamp) =>
                new Date(timestamp as string).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis />
            <Tooltip
              labelFormatter={(label) =>
                new Date(label as string).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <Line
              isAnimationActive={false}
              type="monotone"
              dataKey="cumulativeReleases"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <ReferenceLine
              x={dateToNumber(SopDateString)}
              stroke="red"
              strokeWidth={2}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
