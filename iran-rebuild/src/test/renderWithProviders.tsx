import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { ProjectProvider } from "../context/ProjectContext";
import { CommentProvider } from "../context/CommentContext";
import { InvestorProvider } from "../context/InvestorContext";
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
            <InvestorProvider>
              <Routes>
                <Route path="/fa/*" element={ui} />
                <Route path="/*" element={ui} />
              </Routes>
            </InvestorProvider>
          </CommentProvider>
        </ProjectProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}
