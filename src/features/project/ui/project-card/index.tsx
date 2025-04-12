import { Project, useDeleteProject, useGetProjectByUser } from '@/entities';

import { useLocation, useParams } from 'react-router';
export const formatDate = (date: string): string => {
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = formattedDate.getMonth() + 1; // 0부터 시작하므로 1을 더해줘
  const day = formattedDate.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const location = useLocation();
  const { pathname } = location;
  const params = useParams();

  const { mutate: deleteProject } = useDeleteProject();
  const { refetch: projectListRefetch } = useGetProjectByUser(params.userId);

  const handleDeleteClick = () => {
    deleteProject(project._id, {
      onSuccess: () => {
        projectListRefetch();
      },
    });
  };

  const isMyPage = pathname.includes('my-page');
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

        <div className="flex lg:flex-row flex-col w-full">
          <span className="w-full p-2 rounded-lg">
            {formatDate(project.duration.startDate)} 시작
          </span>
          <span className="w-full p-2 rounded-lg">
            {formatDate(project.duration.endDate)} 끝
          </span>
        </div>
      </div>

      {isMyPage && (
        <div className="flex gap-3 w-full mt-2">
          <div className="flex-1" />
          <button
            onClick={handleDeleteClick}
            className="px-3 py-2 rounded-md text-black border border-alt"
          >
            삭제하기
          </button>
          <button className="px-3 py-2 rounded-md text-primary border border-primary">
            수정하기
          </button>
        </div>
      )}
    </article>
  );
};
