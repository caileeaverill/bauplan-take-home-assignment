'use client'

import { useState } from 'react';
import { useFilters } from '@/hooks/useFilters';
import { useCommitHandlers } from '@/hooks/useCommitHandlers';
import { useCommits } from '@/hooks/useCommits';
import Timeline from '@/components/home/Timeline';
import Filters from '@/components/home/Filters';
import CommitDetails from '@/components/home/CommitDetails';
import { applyFilters } from '@/lib/commitUtils';
import { processCommits } from '@/lib/commitUtils';

function Page() {
  const [commitCount, setCommitCount] = useState<number>(25);

  const { commits, error } = useCommits(commitCount);

  const branchList = commits.length > 0
    ? Array.from(new Set(commits
      .map(commit => commit.ref?.name)
      .filter((name): name is string => Boolean(name))
    )).sort()
    : [];

  const authorList = commits.length > 0
    ? Array.from(new Set(commits
      .map(commit => commit?.authors?.[0]?.name || "Unknown")
      .filter((name): name is string => Boolean(name))
    )).sort()
    : [];

  const {
    filters,
    handleBranchSelect,
    handleUserSelect,
    handleDateSelect,
    handleSearch,
  } = useFilters();

  const handleCommitCountChange = (count: number) => {
    setCommitCount(count);
  };

  const filteredCommits = applyFilters(
    commits,
    filters.branch,
    filters.author,
    filters.date.startDate,
    filters.date.endDate,
    filters.searchQuery
  );

  const {
    selectedCommit,
    handleSelectCommit,
    handleNextCommit,
    handlePreviousCommit,
    hasNext,
    hasPrevious,
  } = useCommitHandlers(filteredCommits);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 overflow-hidden ">
      <div className="col-span-4 md:col-span-1">
        <Filters
          branches={branchList}
          users={authorList}
          selectedUser={filters.author}
          onBranchSelect={handleBranchSelect}
          onUserSelect={handleUserSelect}
          onDateSelect={handleDateSelect}
          onSearch={handleSearch}
          onCommitCountChange={handleCommitCountChange}
        />
      </div>
      <div className="col-span-4 md:col-span-2 max-h-[300px] md:max-h-screen">
        {
          commits.length > 0 && (
            <Timeline
              commits={filteredCommits}
              onSelectCommit={handleSelectCommit}
              selectedCommit={processCommits([selectedCommit])[0] ?? selectedCommit}
            />
          )
        }
      </div>
      <div className="col-span-4 md:col-span-1 relative">
        <CommitDetails
          commit={selectedCommit ?? {}}
          color={selectedCommit?.color ?? ''}
          onNextCommit={handleNextCommit}
          onPreviousCommit={handlePreviousCommit}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
        />
      </div>
    </div>
  );
}

export default Page;