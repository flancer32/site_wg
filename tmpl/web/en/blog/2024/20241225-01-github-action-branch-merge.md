---
title: "New Project: GitHub Action for Branch Merging with File Exclusions"
description: "Developed GitHub Action for branch merging with file exclusion and configured SSH authentication for secure push."
date: 2024-12-25
display_date: "December 25, 2024"
image: "/img/blog/2024/12/25-01.png"
image_alt: "GitHub Action with file exclusion"
---

# New Project: GitHub Action for Branch Merging with File Exclusions

<zoom-img
            src="/img/blog/2024/12/25-01.png"
            alt="GitHub Action: branch merging with exclusions"
            width="100px"
            style="float: left; margin: 15px 15px 0 0;"
    ></zoom-img>

I've completed a project creating a **GitHub Action** that automatically merges one branch into another while excluding specific files. The updated branch is then pushed back to the repository.

During implementation, I discovered that a *Personal Access Token (PAT)* alone isn't sufficient for safely pushing changes — configuring **SSH authentication** was required for reliable repository interaction.

This project provided excellent hands-on experience. If you need to set up CI/CD with GitHub Actions, I invite you to check out my
        [Fiverr Gig](https://www.fiverr.com/wiredgeese/set-up-ci-cd-with-github-actions-for-deployment-on-virtual-server).

Happy coding!
