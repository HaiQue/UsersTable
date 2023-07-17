import Footer from "../components/Footer";
import UsersListOrg from "../components/organisms/UsersListOrg";
import { StyledMain, StyledSection, StyledSectionContent } from "./styles";

const UsersList = () => {
  return (
    <>
      <StyledMain>
        <StyledSection>
          <StyledSectionContent>
            <UsersListOrg />
          </StyledSectionContent>
        </StyledSection>
      </StyledMain>
      <Footer />
    </>
  );
};

export default UsersList;
