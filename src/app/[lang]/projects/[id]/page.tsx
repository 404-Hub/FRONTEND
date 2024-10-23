import { getProject } from '@/api/server/project';
import ProjectTerminal from '@/app/[lang]/projects/[id]/_components/ProjectTerminal';

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const projectId = params.id;

  const project = await getProject(projectId);

  return <ProjectTerminal project={project} />;
}
