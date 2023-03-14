import type { SvgIconProps } from '~/ameliance-ui/components/SvgIcon';
import { SvgIcon } from '~/ameliance-ui/components/SvgIcon';

export function GenesisLogo(props: SvgIconProps) {
	return (
		<SvgIcon
			width="200px"
			height="60px"
			viewBox="0 0 200 60"
			stroke="none"
			{...props}
		>
			<path d="M55.8787 23.8666H61.722V33.5498C60.3864 34.507 58.8504 35.2416 57.1141 35.7535C55.3778 36.2655 53.6416 36.5215 51.9053 36.5215C49.4566 36.5215 47.2529 36.0095 45.294 34.9856C43.3351 33.9393 41.7991 32.4924 40.6861 30.6448C39.5731 28.7972 39.0166 26.7048 39.0166 24.3675C39.0166 22.0302 39.5731 19.9377 40.6861 18.0901C41.7991 16.2425 43.3462 14.8067 45.3274 13.7828C47.3085 12.7365 49.5457 12.2134 52.0388 12.2134C54.2203 12.2134 56.1792 12.5807 57.9155 13.3153C59.6518 14.0499 61.0987 15.1072 62.2562 16.4874L58.0491 20.2939C56.4686 18.5576 54.5765 17.6894 52.3727 17.6894C50.3693 17.6894 48.7554 18.3016 47.5311 19.5259C46.3068 20.7279 45.6947 22.3418 45.6947 24.3675C45.6947 25.6586 45.9729 26.8161 46.5294 27.8401C47.0859 28.8418 47.865 29.632 48.8667 30.2108C49.8685 30.7673 51.0149 31.0455 52.3059 31.0455C53.5748 31.0455 54.7657 30.7895 55.8787 30.2775V23.8666ZM86.3483 30.9453V36.054H67.583V12.6809H85.9143V17.7896H74.1275V21.7296H84.5119V26.6714H74.1275V30.9453H86.3483ZM113.924 12.6809V36.054H108.482L98.1643 23.5995V36.054H91.6866V12.6809H97.1292L107.447 25.1354V12.6809H113.924ZM139.023 30.9453V36.054H120.257V12.6809H138.589V17.7896H126.802V21.7296H137.186V26.6714H126.802V30.9453H139.023ZM152.575 36.5215C150.683 36.5215 148.846 36.2878 147.066 35.8203C145.285 35.3529 143.838 34.7296 142.725 33.9505L144.895 29.0755C145.941 29.7656 147.155 30.3221 148.535 30.745C149.915 31.1679 151.273 31.3794 152.608 31.3794C155.146 31.3794 156.415 30.745 156.415 29.4762C156.415 28.8084 156.048 28.3186 155.313 28.007C154.601 27.6731 153.443 27.3281 151.84 26.9719C150.082 26.5935 148.613 26.1928 147.433 25.7699C146.253 25.3247 145.24 24.6235 144.394 23.6663C143.548 22.7091 143.126 21.418 143.126 19.793C143.126 18.3684 143.515 17.0884 144.294 15.9531C145.073 14.7956 146.231 13.8829 147.767 13.2151C149.325 12.5473 151.228 12.2134 153.477 12.2134C155.012 12.2134 156.526 12.3915 158.018 12.7477C159.509 13.0816 160.822 13.5824 161.958 14.2502L159.921 19.1586C157.695 17.9565 155.536 17.3555 153.443 17.3555C152.13 17.3555 151.173 17.5559 150.572 17.9565C149.971 18.335 149.67 18.8358 149.67 19.4591C149.67 20.0824 150.026 20.5499 150.739 20.8615C151.451 21.1731 152.597 21.4959 154.178 21.8298C155.959 22.2082 157.428 22.62 158.585 23.0652C159.765 23.4882 160.778 24.1783 161.624 25.1354C162.492 26.0704 162.926 27.3503 162.926 28.9753C162.926 30.3777 162.536 31.6465 161.757 32.7818C160.978 33.9171 159.81 34.8297 158.251 35.5198C156.693 36.1876 154.801 36.5215 152.575 36.5215ZM167.649 12.6809H174.261V36.054H167.649V12.6809ZM188.848 36.5215C186.956 36.5215 185.119 36.2878 183.338 35.8203C181.558 35.3529 180.111 34.7296 178.998 33.9505L181.168 29.0755C182.214 29.7656 183.427 30.3221 184.807 30.745C186.188 31.1679 187.545 31.3794 188.881 31.3794C191.419 31.3794 192.688 30.745 192.688 29.4762C192.688 28.8084 192.32 28.3186 191.586 28.007C190.873 27.6731 189.716 27.3281 188.113 26.9719C186.355 26.5935 184.885 26.1928 183.706 25.7699C182.526 25.3247 181.513 24.6235 180.667 23.6663C179.821 22.7091 179.398 21.418 179.398 19.793C179.398 18.3684 179.788 17.0884 180.567 15.9531C181.346 14.7956 182.504 13.8829 184.04 13.2151C185.598 12.5473 187.501 12.2134 189.749 12.2134C191.285 12.2134 192.799 12.3915 194.29 12.7477C195.782 13.0816 197.095 13.5824 198.23 14.2502L196.194 19.1586C193.968 17.9565 191.808 17.3555 189.716 17.3555C188.403 17.3555 187.445 17.5559 186.844 17.9565C186.243 18.335 185.943 18.8358 185.943 19.4591C185.943 20.0824 186.299 20.5499 187.011 20.8615C187.724 21.1731 188.87 21.4959 190.45 21.8298C192.231 22.2082 193.7 22.62 194.858 23.0652C196.038 23.4882 197.051 24.1783 197.896 25.1354C198.765 26.0704 199.199 27.3503 199.199 28.9753C199.199 30.3777 198.809 31.6465 198.03 32.7818C197.251 33.9171 196.082 34.8297 194.524 35.5198C192.966 36.1876 191.074 36.5215 188.848 36.5215Z" fill="black" />
			<path d="M42.1707 47.2843V50.818H47.2541V52.0636H42.1707V56.1622H40.7224V46.0243H47.8769V47.2843H42.1707ZM56.6935 56.1622L54.5066 53.0484C54.2362 53.0677 54.0238 53.0773 53.8693 53.0773H51.3638V56.1622H49.9156V46.0243H53.8693C55.1824 46.0243 56.2155 46.338 56.9687 46.9656C57.7218 47.5932 58.0983 48.4574 58.0983 49.558C58.0983 50.3401 57.9052 51.0063 57.519 51.5567C57.1328 52.107 56.5824 52.5077 55.868 52.7587L58.2721 56.1622H56.6935ZM53.8259 51.8463C54.7431 51.8463 55.4431 51.6484 55.9259 51.2525C56.4087 50.8567 56.65 50.2918 56.65 49.558C56.65 48.8243 56.4087 48.2643 55.9259 47.878C55.4431 47.4822 54.7431 47.2843 53.8259 47.2843H51.3638V51.8463H53.8259ZM65.0147 56.278C63.9913 56.278 63.0692 56.056 62.2485 55.6118C61.4278 55.158 60.7809 54.5353 60.3078 53.7436C59.8444 52.9518 59.6127 52.0684 59.6127 51.0932C59.6127 50.118 59.8444 49.2346 60.3078 48.4429C60.7809 47.6511 61.4278 47.0332 62.2485 46.5891C63.0692 46.1353 63.9913 45.9084 65.0147 45.9084C66.0285 45.9084 66.9457 46.1353 67.7664 46.5891C68.5871 47.0332 69.2292 47.6511 69.6926 48.4429C70.1561 49.2249 70.3878 50.1084 70.3878 51.0932C70.3878 52.078 70.1561 52.9663 69.6926 53.758C69.2292 54.5401 68.5871 55.158 67.7664 55.6118C66.9457 56.056 66.0285 56.278 65.0147 56.278ZM65.0147 54.9891C65.7582 54.9891 66.4244 54.8201 67.0133 54.4822C67.612 54.1442 68.0802 53.6808 68.4182 53.0918C68.7657 52.4932 68.9395 51.827 68.9395 51.0932C68.9395 50.3594 68.7657 49.698 68.4182 49.1091C68.0802 48.5105 67.612 48.0422 67.0133 47.7043C66.4244 47.3663 65.7582 47.1974 65.0147 47.1974C64.2713 47.1974 63.5954 47.3663 62.9871 47.7043C62.3885 48.0422 61.9154 48.5105 61.5678 49.1091C61.2299 49.698 61.0609 50.3594 61.0609 51.0932C61.0609 51.827 61.2299 52.4932 61.5678 53.0918C61.9154 53.6808 62.3885 54.1442 62.9871 54.4822C63.5954 54.8201 64.2713 54.9891 65.0147 54.9891ZM81.32 46.0243V56.1622H80.1324L74.0497 48.6022V56.1622H72.6014V46.0243H73.789L79.8717 53.5842V46.0243H81.32ZM86.3676 47.2843H82.8917V46.0243H91.2772V47.2843H87.8014V56.1622H86.3676V47.2843ZM91.6786 51.5856H95.5744V52.7877H91.6786V51.5856ZM105.275 54.9022V56.1622H97.9179V46.0243H105.072V47.2843H99.3662V50.398H104.45V51.6291H99.3662V54.9022H105.275ZM116.339 46.0243V56.1622H115.151L109.068 48.6022V56.1622H107.62V46.0243H108.808L114.891 53.5842V46.0243H116.339ZM119.373 46.0243H123.646C124.717 46.0243 125.668 46.2367 126.499 46.6615C127.329 47.0863 127.971 47.6849 128.425 48.4574C128.888 49.2201 129.12 50.0987 129.12 51.0932C129.12 52.0877 128.888 52.9711 128.425 53.7436C127.971 54.5063 127.329 55.1001 126.499 55.5249C125.668 55.9498 124.717 56.1622 123.646 56.1622H119.373V46.0243ZM123.559 54.9022C124.379 54.9022 125.099 54.7429 125.717 54.4242C126.344 54.1056 126.827 53.6615 127.165 53.0918C127.503 52.5125 127.672 51.8463 127.672 51.0932C127.672 50.3401 127.503 49.6787 127.165 49.1091C126.827 48.5298 126.344 48.0808 125.717 47.7622C125.099 47.4436 124.379 47.2843 123.559 47.2843H120.822V54.9022H123.559ZM138.182 56.278C137.42 56.278 136.681 56.1622 135.967 55.9304C135.262 55.6891 134.707 55.3801 134.301 55.0036L134.837 53.8739C135.223 54.2215 135.716 54.5063 136.314 54.7284C136.922 54.9408 137.545 55.047 138.182 55.047C139.022 55.047 139.65 54.907 140.065 54.627C140.48 54.3373 140.688 53.956 140.688 53.4829C140.688 53.1353 140.572 52.8553 140.34 52.6429C140.118 52.4208 139.838 52.2518 139.5 52.136C139.172 52.0201 138.704 51.8898 138.096 51.7449C137.333 51.5615 136.715 51.378 136.242 51.1946C135.778 51.0111 135.378 50.7311 135.04 50.3546C134.711 49.9684 134.547 49.4518 134.547 48.8049C134.547 48.2643 134.687 47.7767 134.967 47.3422C135.257 46.9077 135.691 46.5601 136.271 46.2994C136.85 46.0387 137.569 45.9084 138.429 45.9084C139.027 45.9084 139.616 45.9856 140.196 46.1401C140.775 46.2946 141.272 46.5167 141.687 46.8063L141.209 47.9649C140.784 47.6946 140.331 47.4918 139.848 47.3567C139.365 47.2118 138.892 47.1394 138.429 47.1394C137.608 47.1394 136.99 47.2891 136.575 47.5884C136.169 47.8877 135.967 48.2739 135.967 48.747C135.967 49.0946 136.082 49.3794 136.314 49.6015C136.546 49.8139 136.831 49.9829 137.169 50.1084C137.516 50.2242 137.984 50.3498 138.573 50.4849C139.336 50.6684 139.949 50.8518 140.413 51.0353C140.876 51.2187 141.272 51.4987 141.6 51.8753C141.938 52.2518 142.107 52.7587 142.107 53.396C142.107 53.927 141.962 54.4146 141.673 54.8587C141.383 55.2932 140.944 55.6408 140.355 55.9015C139.766 56.1525 139.042 56.278 138.182 56.278ZM148.756 56.278C147.742 56.278 146.825 56.056 146.004 55.6118C145.193 55.158 144.556 54.5401 144.093 53.758C143.629 52.9663 143.398 52.078 143.398 51.0932C143.398 50.1084 143.629 49.2249 144.093 48.4429C144.556 47.6511 145.198 47.0332 146.019 46.5891C146.84 46.1353 147.757 45.9084 148.771 45.9084C149.562 45.9084 150.287 46.0436 150.943 46.3139C151.6 46.5746 152.16 46.9656 152.623 47.487L151.682 48.3994C150.919 47.598 149.968 47.1974 148.829 47.1974C148.075 47.1974 147.395 47.3663 146.787 47.7043C146.178 48.0422 145.7 48.5105 145.353 49.1091C145.015 49.698 144.846 50.3594 144.846 51.0932C144.846 51.827 145.015 52.4932 145.353 53.0918C145.7 53.6808 146.178 54.1442 146.787 54.4822C147.395 54.8201 148.075 54.9891 148.829 54.9891C149.958 54.9891 150.909 54.5836 151.682 53.7725L152.623 54.6849C152.16 55.2063 151.595 55.6022 150.929 55.8725C150.272 56.1429 149.548 56.278 148.756 56.278ZM163.408 46.0243V56.1622H161.959V51.6436H156.137V56.1622H154.689V46.0243H156.137V50.3836H161.959V46.0243H163.408ZM171.019 56.278C169.995 56.278 169.073 56.056 168.253 55.6118C167.432 55.158 166.785 54.5353 166.312 53.7436C165.848 52.9518 165.617 52.0684 165.617 51.0932C165.617 50.118 165.848 49.2346 166.312 48.4429C166.785 47.6511 167.432 47.0332 168.253 46.5891C169.073 46.1353 169.995 45.9084 171.019 45.9084C172.033 45.9084 172.95 46.1353 173.77 46.5891C174.591 47.0332 175.233 47.6511 175.697 48.4429C176.16 49.2249 176.392 50.1084 176.392 51.0932C176.392 52.078 176.16 52.9663 175.697 53.758C175.233 54.5401 174.591 55.158 173.77 55.6118C172.95 56.056 172.033 56.278 171.019 56.278ZM171.019 54.9891C171.762 54.9891 172.428 54.8201 173.017 54.4822C173.616 54.1442 174.084 53.6808 174.422 53.0918C174.77 52.4932 174.944 51.827 174.944 51.0932C174.944 50.3594 174.77 49.698 174.422 49.1091C174.084 48.5105 173.616 48.0422 173.017 47.7043C172.428 47.3663 171.762 47.1974 171.019 47.1974C170.275 47.1974 169.599 47.3663 168.991 47.7043C168.393 48.0422 167.919 48.5105 167.572 49.1091C167.234 49.698 167.065 50.3594 167.065 51.0932C167.065 51.827 167.234 52.4932 167.572 53.0918C167.919 53.6808 168.393 54.1442 168.991 54.4822C169.599 54.8201 170.275 54.9891 171.019 54.9891ZM183.182 56.278C182.159 56.278 181.236 56.056 180.416 55.6118C179.595 55.158 178.948 54.5353 178.475 53.7436C178.012 52.9518 177.78 52.0684 177.78 51.0932C177.78 50.118 178.012 49.2346 178.475 48.4429C178.948 47.6511 179.595 47.0332 180.416 46.5891C181.236 46.1353 182.159 45.9084 183.182 45.9084C184.196 45.9084 185.113 46.1353 185.934 46.5891C186.754 47.0332 187.396 47.6511 187.86 48.4429C188.323 49.2249 188.555 50.1084 188.555 51.0932C188.555 52.078 188.323 52.9663 187.86 53.758C187.396 54.5401 186.754 55.158 185.934 55.6118C185.113 56.056 184.196 56.278 183.182 56.278ZM183.182 54.9891C183.925 54.9891 184.592 54.8201 185.181 54.4822C185.779 54.1442 186.247 53.6808 186.585 53.0918C186.933 52.4932 187.107 51.827 187.107 51.0932C187.107 50.3594 186.933 49.698 186.585 49.1091C186.247 48.5105 185.779 48.0422 185.181 47.7043C184.592 47.3663 183.925 47.1974 183.182 47.1974C182.439 47.1974 181.763 47.3663 181.154 47.7043C180.556 48.0422 180.083 48.5105 179.735 49.1091C179.397 49.698 179.228 50.3594 179.228 51.0932C179.228 51.827 179.397 52.4932 179.735 53.0918C180.083 53.6808 180.556 54.1442 181.154 54.4822C181.763 54.8201 182.439 54.9891 183.182 54.9891ZM190.769 46.0243H192.217V54.9022H197.706V56.1622H190.769V46.0243Z" fill="black" />
			<path d="M1 26.8092L22.5257 2.14442L11.9931 32.4923L1 26.8092Z" fill="#005394" />
			<path d="M22.5257 2.14436L11.9932 32.4923L27.765 35.0757L22.5257 2.14436Z" fill="#0C90E4" />
			<path d="M6.23571 58.2429L1 26.809L11.9931 32.4921L6.23571 58.2429Z" fill="#007AD2" />
			<path d="M6.23572 58.2429L27.765 35.0756L11.9932 32.4921L6.23572 58.2429Z" fill="#0189E9" />
			<path d="M22.5839 2.09347L1.05804 26.7584M22.5839 2.09347L12.0511 32.4415M22.5839 2.09347L27.823 35.0248M1.05804 26.7584L6.29355 58.1923M1.05804 26.7584L12.0511 32.4415M6.29355 58.1923L27.823 35.0248M6.29355 58.1923L12.0511 32.4415M12.0511 32.4415L27.823 35.0248" stroke="black" strokeWidth="1.62602" />
		</SvgIcon>
	);
}