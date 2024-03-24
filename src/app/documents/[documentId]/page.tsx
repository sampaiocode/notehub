'use client';

import { useQuery } from '@tanstack/react-query';
import { getDocumentById } from '@/actions/get-documents';
import { Banner } from './components/banner';
import { Cover } from './components/cover';
import { Toolbar } from './components/toolbar';

interface DocumentPageProps {
  params: {
    documentId: string;
  };
}

export default function DocumentPage({ params }: DocumentPageProps) {
  const { data: document } = useQuery({
    queryKey: ['get-document-by-id', params.documentId],
    queryFn: () => getDocumentById({ id: params.documentId as string }),
  });

  return (
    <div className="pb-40">
      {document?.isArchived && <Banner documentId={document.id} />}
      <Cover url={document?.coverImage} />

      <div className="mt-28 mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar initialData={document} />
      </div>
    </div>
  );
}
