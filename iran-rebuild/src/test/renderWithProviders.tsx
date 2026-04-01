import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { ProjectProvider } from "../context/ProjectContext";
import { CommentProvider } from "../context/CommentContext";
import type { ReactNode } from "react";

interface Options {
  route?: string;
}

export function renderWithProviders(ui: ReactNode, { route = "/" }: Options = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <ProjectProvider>
          <CommentProvider>
            {ui}
          </CommentProvider>
        </ProjectProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}
