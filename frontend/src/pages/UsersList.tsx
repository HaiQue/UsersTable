import Footer from "../components/Footer";
import UsersListOrg from "../components/organisms/UsersListOrg";
import { StyledMain, StyledSection, StyledSectionContent } from "./styles";
import { IPageProps } from "./types";

const UsersList = ({ theme, layoutbreakpoint }: IPageProps) => {
  return (
    <>
      <StyledMain layoutbreakpoint={layoutbreakpoint}>
        <StyledSection>
          <StyledSectionContent theme={theme}>
            <UsersListOrg theme={theme} />
          </StyledSectionContent>
        </StyledSection>
      </StyledMain>
      <Footer />
    </>
  );
};

export default UsersList;
