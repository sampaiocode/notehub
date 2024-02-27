'use client';

import { useState } from 'react';
import { Item } from './item';
import { ChildDocuments } from './child-documents';
import { useQuery } from '@tanstack/react-query';
import { getDocuments } from '@/actions/actions';
import { IconFile } from '@tabler/icons-react';

export function DocumentList() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  function handleExpand(documentId: string) {
    setExpanded(prevExpanded => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  }

  const { data: documents } = useQuery({
    queryKey: ['get-documents'],
    queryFn: () => getDocuments(),
  });

  return (
    <>
      {documents?.map(document => (
        <div key={document.id}>
          <Item
            id={document.id}
            icon={IconFile}
            label={document.title}
            expanded={expanded[document.id]}
            handleExpand={() => handleExpand(document.id)}
          />

          {expanded[document.id] && <ChildDocuments parentDocumentId={document.id} />}
        </div>
      ))}
    </>
  );
}
