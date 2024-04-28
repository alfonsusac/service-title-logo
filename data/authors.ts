
export const authors = {
  styxpilled: {
    name: 'styxpilled',
    pfp: '',
    link: {
      twitter: 'https://twitter.com/styxpilled'
    },
    license: {},
    repository: '',
  },
  mkpoli: {
    name: 'mkpoli',
    pfp: 'https://avatars.githubusercontent.com/u/3502597?v=4',
    link: {
      github: 'https://github.com/mkpoli',
      twitter: 'https://twitter.com/mkpoli'
    },
    license: {
      label: 'CC0',
      href: 'https://github.com/mkpoli/VTuber-Styled-Logos/blob/main/LICENSE'
    },
    repository: 'https://github.com/mkpoli/VTuber-Styled-Logos/blob/main/LICENSE'
  },
  "fuma-nama": {
    name: 'fuma-nama',
    pfp: 'https://avatars.githubusercontent.com/u/76240755?v=4',
    link: {
      github: 'https://github.com/fuma-nama',
    },
    license: {},
    repository: '',
  },
  sawaratsuki: {
    name: 'sawaratsuki',
    pfp: 'https://avatars.githubusercontent.com/u/64746703?v=4',
    link: {
      github: 'https://github.com/SAWARATSUKI',
      twitter: 'https://twitter.com/sawaratsuki1004',
    },
    repository: 'https://github.com/SAWARATSUKI/ServiceLogos',
    license: {
      label: 'CC BY-NC-SA 4.0 with Additional Notes',
      href: 'https://github.com/SAWARATSUKI/ServiceLogos#license',
    }
  },
  cr1sta_dev: {
    name: 'cr1sta_dev',
    pfp: 'https://avatars.githubusercontent.com/u/70198466?v=4',
    link: {
      github: 'https://github.com/Crysta1221',
      twitter: 'https://twitter.com/cr1sta_dev',
    },
    repository: "https://github.com/Crysta1221/tech_logos",
    license: {
      label: 'Custom',
      href: 'https://github.com/Crysta1221/tech_logos/blob/main/README.md#license'
    }
  },
  saltyaom: {
    name: 'saltyaom',
    pfp: 'https://avatars.githubusercontent.com/u/35027979?v=4',
    link: {
      github: 'https://github.com/SaltyAom',
      twitter: 'https://twitter.com/saltyaom',
    },
    license: {},
    repository: '',
  },
  disphing: {
    name: 'disphing',
    // pfp: 'https://pbs.twimg.com/profile_images/1755004716046864384/ZUdGbYVD_400x400.jpg',
    link: {
      twitter: 'https://twitter.com/dsphng',
    },
    license: {},
    repository: 'https://drive.google.com/drive/folders/1Hy1_pAWx95QTv1nZFKUl96GImq4iKdf8',
  },
  aikoyori: {
    name: 'aikoyori',
    pfp: 'https://avatars.githubusercontent.com/u/12034280?v=4',
    link: {
      twitter: 'https://twitter.com/Aikoyori',
      github: 'https://github.com/Aikoyori'
    },
    license: {
      label: 'CC BY-NC-SA 4.0',
      href: 'https://github.com/Aikoyori/ProgrammingVTuberLogos/blob/main/LICENSE.md'
    },
    repository: 'https://github.com/Aikoyori/ProgrammingVTuberLogos',
  },
  hvpexe: {
    name: 'hvpexe',
    link: {
      github: 'https://github.com/hvpexe',
      twitter: 'https://twitter.com/Manhkbrady',
    },
    pfp: 'https://avatars.githubusercontent.com/u/97070754',
    repository: 'https://github.com/hvpexe/ProgrammingVTuberLogos-VisualStudio/',
    license: {
      label: 'CC-BY-NC-SA-4.0',
      href: 'https://github.com/hvpexe/ProgrammingVTuberLogos-VisualStudio/blob/master/LICENSE.md'
    }
  },
  "g2-games": {
    name: 'g2-games',
    link: {
      github: 'https://github.com/G2-Games',
    },
    pfp: "https://avatars.githubusercontent.com/u/72430668",
    license: {
      label: 'CC BY-NC-SA 4.0',
      href: 'https://github.com/G2-Games/fun-logos/blob/main/LICENSE'
    },
    repository: "https://github.com/G2-Games/fun-logos"
  },
  "IDMDiamondl": {
    name: 'IDMDiamondl',
    link: {
      github: 'https://github.com/lDMDiamondl',
    },
    pfp: 'https://avatars.githubusercontent.com/u/100426562',
    license: {
      label: 'CC BY-NC-SA 4.0',
      href: 'https://github.com/lDMDiamondl/ProgrammingVTuberLogosKR/blob/main/LICENSE.md'
    },
    repository: "https://github.com/lDMDiamondl/ProgrammingVTuberLogosKR/"
  }
} satisfies {
  [key: string]: Author
}

type Author = {
  name: string,
  pfp?: string,
  link: {
    github?: string,
    twitter?: string,
  },
  repository?: string,
  license: {
    label?: string,
    href?: string,
  },
}
