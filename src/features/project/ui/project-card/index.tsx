import { Project } from '@/entities';
import { formatDate } from '@/pages/Mypage';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="flex flex-col gap-6 w-full border border-alt p-6 rounded-lg">
      <div className="flex w-full justify-start lg:gap-30 items-center">
        <p className="min-w-30 text-black-alt">이름</p>
        <span className="w-full p-2 rounded-lg">{project.name}</span>
      </div>

      <div className="flex w-full justify-start lg:gap-30 items-center">
        <p className="min-w-30 text-black-alt">직무</p>
        <span className="w-full p-2 rounded-lg">{project.position}</span>
      </div>

      <div className="flex w-full justify-start lg:gap-30 items-center">
        <p className="min-w-30 text-black-alt">내용</p>
        <span className="w-full p-2 rounded-lg">{project.description}</span>
      </div>

      <div className="flex w-full justify-start lg:gap-30 items-center">
        <p className="min-w-30 text-black-alt">기간</p>
        <span className="w-full p-2 rounded-lg">
          {formatDate(project.duration.startDate)}
        </span>
        <span className="w-full p-2 rounded-lg">
          {formatDate(project.duration.endDate)}
        </span>
      </div>
    </article>
  );
};
