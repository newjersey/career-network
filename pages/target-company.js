import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from '../components/ScaffoldContainer';
import StaticList from '../components/StaticList';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
  },
}));

function Networking() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Typography variant="h3" component="h1">Identifying/Researching Target Companies Resources:</Typography>

        <Typography variant="body1">
          A major portion of your job search time should be spent on identifying and researching target companies and making connections to individuals within those companies. In this section, you will learn what to look for and how to find information so you can have a more targeted and effective job search plan.
          </Typography>
        <Typography variant="body1">
          Identifying  target company will help guide your job search with direction and focus.
          </Typography>
        <Typography variant="body1">
          Researching target company will effectively narrow your job search.
          </Typography>
        <Typography variant="body1">
          Reviewing the “Careers” section of target companies will help you effectively search for positions you are qualified for within the companies you are interested in
          </Typography>
        <Typography variant="body1">
          Although it’s something many job seekers hate, identifying and researching target companies are two high-priority tasks that will make your job search more productive, more effective and yield better results.
          </Typography>


        <StaticList title="The Basic Steps to Identifying/Researching Target Companies: ">
          <React.Fragment>
            <strong>Make a list of target companies</strong> –
              be strategic about the companies and the job opportunities you want to pursue. There are several ways you can begin to develop a list of companies you want to target in your job search, including using job postings, looking up companies on LinkedIn, and through conversations with people in your network. Every time you hear of a new company that might hire people with your background and experience, you should add them to your list so that you can do some further research.            </React.Fragment>
          <React.Fragment>
            <strong>Find  information on those target companies</strong> –
              do your research. Start with the company website. You can also look up the company on LinkedIn and do a Google search to discover more information. As you gather information about your target companies, keep notes on what you discover, especially as the information may apply to how you can bring value to the company. Also pay attention to whether the company is aligned with your personal values, passions, etc.             </React.Fragment>
          <React.Fragment>
            <strong>Find job listings at those target companies that are suitable for you </strong> –
              look for opportunities at your target companies that would fit your background and skills. </React.Fragment>
          <React.Fragment>
            <strong>Identify contacts at those target companies </strong> –
              targeted job search and targeted networking is critical to job search. As you are researching companies that interest you, you also want to begin developing a list of contacts within those companies. Ideally, these are people you already know. But you will also want to identify hiring managers, other people in departments you might work with, etc.  LinkedIn is a great resource to find connections.  For each target company you’ve identified, continue to compile a list of contacts within that company.              </React.Fragment>
          <React.Fragment>
            <strong>Reach out to those contacts and start to build relationships or work on existing relationships </strong> –
              expand your connections or deepen existing ones at the target companies you want to pursue. Keep track of the connections, the contact you have made with these connections, and be sure to always follow up. </React.Fragment>
          <React.Fragment>
            <strong>Create a targeted job search plan  </strong> –
              your plan should consist of specific job opportunities at specific companies and specific connections you can turn to to help get your foot in the door. </React.Fragment>
        </StaticList>

        <StaticList title="Resources to Help" />

        <StaticList title="Webinars (from NSCN)" nesting={1}>
          <Link href="https://vimeo.com/241749119">Identifying and Researching Target Companies</Link>
          <Link href="https://vimeo.com/325491307">Creating Targeted Job Search Plans</Link>
        </StaticList>

        <StaticList title="Identifying Company Targets" nesting={1}>
          <Link href="https://www.thebalancecareers.com/creating-a-target-list-of-companies-2060032">How to Create a Target List of Companies</Link>
          <Link href="https://www.careerattraction.com/job-searching-20-creative-ways-to-build-your-target-company-list/">Job Searching? 20 Creative Ways to Build Your Target Company List</Link>
          <Link href="https://executivecareerbrand.com/7-tips-to-build-your-executive-job-search-target-companies-list/">7 Tips to Build Your Executive Job Search Target Companies List</Link>
          <Link href="https://www.topresume.com/career-advice/create-target-company-list-for-job-search">How to Build a Company List of Top Employers for Your Job Search</Link>
          <Link href="https://premium.linkedin.com/content/premium/global/en_us/index/jobsearch/resources/get-connected/how-to-build-a-list-of-target-companies">How to Build a List of Target Companies</Link>
          <Link href="https://www.linkedin.com/directory/companies/">LinkedIn Companies Directory</Link>
        </StaticList>

        <StaticList title="Research Company Targets" nesting={1}>
          <Link href="https://www.thebalancecareers.com/how-to-research-a-company-2058508">How and Why to Research a Company</Link>
          <Link href="https://www.aol.com/2009/04/01/why-is-company-research-so-important/">Why is Company Research So Important?</Link>
          <Link href="https://www.youtube.com/watch?v=1A9bLHyBw94">How to Conduct Company Research for your Job Search</Link>
          <Link href="https://biginterview.com/blog/2014/10/company-research-job-interview.html">The Job-Seeker's Guide to Company Research</Link>
          <Link href="https://executivecareerbrand.com/best-ways-and-places-to-research-your-target-employers/">Best Ways and Places to Research Your Target Employers</Link>
          <Link href="https://www.flexjobs.com/blog/post/job-search-tactic-start-with-companies-not-job-listings/">Job Search Tactic: Start with Companies, Not Job Listings</Link>
          <Link href="https://www.indeed.com/career-advice/finding-a-job/the-complete-guide-to-researching-a-company">The Complete Guide to Researching a Company</Link>
          <Link href="https://www.glassdoor.com/Salaries/index.htm">Glassdoor</Link>
        </StaticList>

        <StaticList title="Identifying and Researching Company Contacts" nesting={1}>
          <Link href="https://www.forbes.com/sites/carolinecenizalevine/2016/03/28/how-to-find-a-contact-at-your-dream-company-six-ways-to-get-insider-information/#7d10cd897698">How To Find A Contact At Your Dream Company: Six Ways To Get Insider Information</Link>
          <Link href="https://www.thebalancecareers.com/how-to-find-contacts-at-a-company-2062589">How to Find Contacts at a Company</Link>
          <Link href="https://www.themuse.com/advice/how-to-find-an-in-at-your-dream-companyfast">How to Find an “In” at Your Dream Company—Fast</Link>
          <Link href="https://www.theladders.com/career-advice/how-to-make-inside-connections">How to Create Inside Connections with Companies You Want to Work For</Link>
          <Link href="https://www.socialmediaexaminer.com/how-to-find-and-connect-with-target-prospects-on-linkedin/">How to Find and Connect With Target Prospects on LinkedIn</Link>
          <Link href="https://blog.linkedin.com/2018/february/21/tips-for-searching-like-a-pro-on-linkedin">Tips for Searching Like a Pro on LinkedIn</Link>
          <Link href="https://www.linkedin.com/directory/companies/">LinkedIn Companies Directory</Link>
          <Link href="https://www.linkedin.com/help/linkedin/answer/4326/searching-your-connection-s-connections?lang=en">Searching Your Connection's Connections</Link>
        </StaticList>

      </ScaffoldContainer>
    </div>
  );
}

export default Networking;
