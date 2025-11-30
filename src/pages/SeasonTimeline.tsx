import React, { useState } from 'react';
import { useApp } from '../store';
import { format, addDays, differenceInDays } from 'date-fns';

type TimelineEntry = {
  date: string;
  milestone: string;
};

const SeasonTimeline: React.FC<{ dataSource: 'live' | 'published' }> = ({ dataSource }) => {
  const { dates, publishedData, upsertDate } = useApp();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [increment, setIncrement] = useState<number | ''>('');
  const [generated, setGenerated] = useState<TimelineEntry[]>([]);

  const data = dataSource === 'published' ? publishedData?.dates ?? [] : generated.length ? generated : dates;

  const generateDates = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const total = differenceInDays(end, start);
    const step = increment && increment > 1 ? increment : 1;

    const result: TimelineEntry[] = [];
    for (let i = 0; i <= total; i += step) {
      const d = addDays(start, i);
      const dateStr = format(d, 'yyyy-MM-dd');
      const week = Math.floor(i / 7) + 1;
      const day = i + 1;
      result.push({ date: dateStr, milestone: '' });
    }
    setGenerated(result);
  };

  const updateMilestone = (index: number, value: string) => {
    const next = [...generated];
    next[index].milestone = value;
