import {
  Project,
  useDeleteProject,
  useGetProjectByUser,
  usePatchProject,
} from '@/entities';
import { Input, InputProps } from '@/shared/components/input';
import { useLocation, useParams } from 'react-router';
import React from 'react';
import { Button } from '@/shared';

export const formatDate = (date: string): string => {
  const d = new Date(date);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
};

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { pathname } = useLocation();
  const { userId } = useParams();
  const { mutate: deleteProject } = useDeleteProject();
  const { mutate: patchProject } = usePatchProject();
  const { refetch: projectListRefetch } = useGetProjectByUser(userId);

  const [isEditing, setIsEditing] = React.useState(false);

  const [projectState, setProjectState] = React.useState({
    name: project.name,
    position: project.position,
    description: project.description,
    duration: {
      startDate: project.duration.startDate.slice(0, 10),
      endDate: project.duration.endDate.slice(0, 10),
    },
  });

  const isMyPage = pathname.includes('my-page');

  const handleChange = (
    field: string,
    value: string | { startDate: string; endDate: string },
  ) => {
    if (field === 'duration') {
      setProjectState((prev) => ({ ...prev, duration: value as any }));
    } else {
      setProjectState((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleDeleteClick = () => {
    deleteProject(project._id, { onSuccess: projectListRefetch });
  };

  const handlePatchClick = () => {
    patchProject(
      {
        projectId: project._id,
        updatedData: projectState,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          projectListRefetch();
        },
      },
    );
  };

  return (
    <article className="flex flex-col gap-6 w-full border border-alt p-6 rounded-lg">
      <InfoRow
        label="이름"
        isEditing={isEditing}
        value={projectState.name}
        onChange={(v) => handleChange('name', v)}
      />

      <InfoRow
        label="직무"
        isEditing={isEditing}
        value={projectState.position}
        onChange={(v) => handleChange('position', v)}
      />

      <InfoRow
        label="내용"
        isEditing={isEditing}
        value={projectState.description}
        onChange={(v) => handleChange('description', v)}
      />

      <div className="flex w-full justify-start lg:gap-30 items-center">
        <p className="min-w-30 text-black-alt">기간</p>
        <div className="flex lg:flex-row flex-col w-full gap-2">
          {isEditing ? (
            <>
              <input
                type="date"
                value={projectState.duration.startDate}
                onChange={(e) =>
                  handleChange('duration', {
                    ...projectState.duration,
                    startDate: e.target.value,
                  })
                }
                className="w-full p-2 rounded-lg border border-gray-300"
              />
              <input
                type="date"
                value={projectState.duration.endDate}
                onChange={(e) =>
                  handleChange('duration', {
                    ...projectState.duration,
                    endDate: e.target.value,
                  })
                }
                className="w-full p-2 rounded-lg border border-gray-300"
              />
            </>
          ) : (
            <>
              <span className="w-full p-2 rounded-lg">
                {formatDate(project.duration.startDate)} 시작
              </span>
              <span className="w-full p-2 rounded-lg">
                {formatDate(project.duration.endDate)} 끝
              </span>
            </>
          )}
        </div>
      </div>

      {isMyPage && (
        <div className="flex gap-3 w-full mt-2">
          <div className="flex-1" />
          {isEditing ? (
            <Button variant="outlinePrimary" onClick={handlePatchClick}>
              저장하기
            </Button>
          ) : (
            <>
              <Button variant="outlineAlt" onClick={handleDeleteClick}>
                삭제하기
              </Button>
              <Button
                variant="outlinePrimary"
                onClick={() => setIsEditing(true)}
              >
                수정하기
              </Button>
            </>
          )}
        </div>
      )}
    </article>
  );
};

type InfoRowProps = {
  label: string;
  isEditing: boolean;
  value: string;
  onChange: (v: string) => void;
} & InputProps; // InputProps 상속받기

export const InfoRow: React.FC<InfoRowProps> = ({
  label,
  isEditing,
  value,
  onChange,
  ...inputProps // InputProps에 있는 나머지 속성들을 다 받을 수 있음
}: InfoRowProps) => {
  return (
    <div className="flex w-full justify-start lg:gap-30 items-center">
      <p className="min-w-30 text-black-alt">{label}</p>
      {isEditing ? (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary transition-all rounded-lg"
          placeholder=""
          autoComplete="off"
          {...inputProps} // InputProps로 받은 나머지 props 전달
        />
      ) : (
        <p className="w-full p-2 rounded-lg">{value}</p>
      )}
    </div>
  );
};
