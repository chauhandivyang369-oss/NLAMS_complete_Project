import { useWorkspace } from '../contexts/WorkspaceContext.jsx';

export function useRequisition() {
  const { activeProject, parcels, objections, rnrFamilies, depositEscrow, resolveObjection } = useWorkspace();

  return {
    project: activeProject,
    parcels,
    objections,
    rnrFamilies,
    depositEscrow,
    resolveObjection
  };
}
