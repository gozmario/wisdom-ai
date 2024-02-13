"use client";
import Table, { ColumnDef } from "@/components/Table/Table";
import { ApiData } from "@/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";

const columnDef: ColumnDef<ApiData>[] = [
  { dataIndex: "title", name: "Title", visible: true },
  { dataIndex: "release_year", name: "Release year", visible: true },
  { dataIndex: "distributor", name: "Distributor", visible: true },
  { dataIndex: "director", name: "Director", visible: true },
  { dataIndex: "writer", name: "Writer", visible: true },
];

// TODO: set of filters as a string
// TODO: table row rendering virtualization

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const limit = searchParams.get("limit") ?? 100;
  const offset = searchParams.get("offset") ?? 0;
  const order = searchParams.get("order") ?? "";
  // http://localhost:3000/?order=title DESC

  useEffect(() => {
    fetch(
      `https://data.sfgov.org/resource/yitu-d5am.json?$limit=${limit}&$offset=${offset}&$order=${order}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [limit, offset, order]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;
  return (
    <main className={styles.main}>
      <Table columnDef={columnDef} data={data} />
    </main>
  );
}
