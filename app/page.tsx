'use client'

import { useState } from 'react';
import { useCommitContext } from '@/context/CommitContext';
import Timeline from '@/components/home/Timeline';

function Page() {
  const { commits, error } = useCommitContext();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex-1">
        <Timeline commits={commits} />
      </div>
    </div>
  );
}

export default Page;