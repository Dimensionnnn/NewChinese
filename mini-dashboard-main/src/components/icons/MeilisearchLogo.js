import * as React from 'react'

function SvgMeilisearchLogo({ title, titleId, ...props }) {
  return (
    // <h3>新中文</h3>
    <svg
      viewBox="0 0 127 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        d="M.825 73.993l23.244-59.47A21.85 21.85 0 0144.42.625h14.014L35.19 60.096a21.85 21.85 0 01-20.352 13.897H.825z"
        fill="url(#meilisearch_logo_svg__paint0_linear_0_6)"
      />
      <path
        d="M34.925 73.993l23.243-59.47A21.85 21.85 0 0178.52.626h14.013L69.29 60.096a21.85 21.85 0 01-20.351 13.897H34.925z"
        fill="url(#meilisearch_logo_svg__paint1_linear_0_6)"
      />
      <path
        d="M69.026 73.993l23.244-59.47A21.85 21.85 0 01112.621.626h14.014l-23.244 59.47a21.851 21.851 0 01-20.352 13.897H69.026z"
        fill="url(#meilisearch_logo_svg__paint2_linear_0_6)"
      />
      <defs>
        <linearGradient
          id="meilisearch_logo_svg__paint0_linear_0_6"
          x1={126.635}
          y1={-4.978}
          x2={0.825}
          y2={66.098}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF5CAA" />
          <stop offset={1} stopColor="#FF4E62" />
        </linearGradient>
        <linearGradient
          id="meilisearch_logo_svg__paint1_linear_0_6"
          x1={126.635}
          y1={-4.978}
          x2={0.825}
          y2={66.098}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF5CAA" />
          <stop offset={1} stopColor="#FF4E62" />
        </linearGradient>
        <linearGradient
          id="meilisearch_logo_svg__paint2_linear_0_6"
          x1={126.635}
          y1={-4.978}
          x2={0.825}
          y2={66.098}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF5CAA" />
          <stop offset={1} stopColor="#FF4E62" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default SvgMeilisearchLogo
