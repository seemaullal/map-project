--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Homebrew)
-- Dumped by pg_dump version 14.5 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: favorite_stops; Type: TABLE; Schema: public; Owner: brookeseiter
--

CREATE TABLE public.favorite_stops (
    favorite_stop_id integer NOT NULL,
    user_id integer,
    stop_id integer
);


ALTER TABLE public.favorite_stops OWNER TO brookeseiter;

--
-- Name: favorite_stops_favorite_stop_id_seq; Type: SEQUENCE; Schema: public; Owner: brookeseiter
--

CREATE SEQUENCE public.favorite_stops_favorite_stop_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.favorite_stops_favorite_stop_id_seq OWNER TO brookeseiter;

--
-- Name: favorite_stops_favorite_stop_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: brookeseiter
--

ALTER SEQUENCE public.favorite_stops_favorite_stop_id_seq OWNED BY public.favorite_stops.favorite_stop_id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: brookeseiter
--

CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    rating integer NOT NULL,
    review_content text NOT NULL,
    user_id integer,
    stop_id integer
);


ALTER TABLE public.reviews OWNER TO brookeseiter;

--
-- Name: reviews_review_id_seq; Type: SEQUENCE; Schema: public; Owner: brookeseiter
--

CREATE SEQUENCE public.reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_review_id_seq OWNER TO brookeseiter;

--
-- Name: reviews_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: brookeseiter
--

ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;


--
-- Name: routes; Type: TABLE; Schema: public; Owner: brookeseiter
--

CREATE TABLE public.routes (
    route_id integer NOT NULL,
    num_stops integer NOT NULL,
    route_name character varying(50) NOT NULL,
    total_miles double precision NOT NULL,
    total_time timestamp without time zone NOT NULL,
    start_lat double precision NOT NULL,
    start_lng double precision NOT NULL,
    end_lat double precision NOT NULL,
    end_lng double precision NOT NULL,
    user_id integer
);


ALTER TABLE public.routes OWNER TO brookeseiter;

--
-- Name: routes_route_id_seq; Type: SEQUENCE; Schema: public; Owner: brookeseiter
--

CREATE SEQUENCE public.routes_route_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.routes_route_id_seq OWNER TO brookeseiter;

--
-- Name: routes_route_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: brookeseiter
--

ALTER SEQUENCE public.routes_route_id_seq OWNED BY public.routes.route_id;


--
-- Name: stop_categories; Type: TABLE; Schema: public; Owner: brookeseiter
--

CREATE TABLE public.stop_categories (
    stop_category_id integer NOT NULL,
    stop_category_name character varying(50) NOT NULL,
    stop_id integer
);


ALTER TABLE public.stop_categories OWNER TO brookeseiter;

--
-- Name: stop_categories_stop_category_id_seq; Type: SEQUENCE; Schema: public; Owner: brookeseiter
--

CREATE SEQUENCE public.stop_categories_stop_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stop_categories_stop_category_id_seq OWNER TO brookeseiter;

--
-- Name: stop_categories_stop_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: brookeseiter
--

ALTER SEQUENCE public.stop_categories_stop_category_id_seq OWNED BY public.stop_categories.stop_category_id;


--
-- Name: stops; Type: TABLE; Schema: public; Owner: brookeseiter
--

CREATE TABLE public.stops (
    stop_id integer NOT NULL,
    stop_name character varying(50) NOT NULL,
    miles_from_path double precision NOT NULL,
    time_from_path timestamp without time zone NOT NULL,
    stop_lat double precision NOT NULL,
    stop_lng double precision NOT NULL,
    user_id integer
);


ALTER TABLE public.stops OWNER TO brookeseiter;

--
-- Name: stops_on_route; Type: TABLE; Schema: public; Owner: brookeseiter
--

CREATE TABLE public.stops_on_route (
    stop_on_route_id integer NOT NULL,
    route_id integer,
    stop_id integer
);


ALTER TABLE public.stops_on_route OWNER TO brookeseiter;

--
-- Name: stops_on_route_stop_on_route_id_seq; Type: SEQUENCE; Schema: public; Owner: brookeseiter
--

CREATE SEQUENCE public.stops_on_route_stop_on_route_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stops_on_route_stop_on_route_id_seq OWNER TO brookeseiter;

--
-- Name: stops_on_route_stop_on_route_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: brookeseiter
--

ALTER SEQUENCE public.stops_on_route_stop_on_route_id_seq OWNED BY public.stops_on_route.stop_on_route_id;


--
-- Name: stops_stop_id_seq; Type: SEQUENCE; Schema: public; Owner: brookeseiter
--

CREATE SEQUENCE public.stops_stop_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stops_stop_id_seq OWNER TO brookeseiter;

--
-- Name: stops_stop_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: brookeseiter
--

ALTER SEQUENCE public.stops_stop_id_seq OWNED BY public.stops.stop_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: brookeseiter
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    fname character varying(25) NOT NULL,
    lname character varying(25) NOT NULL,
    email character varying(50) NOT NULL,
    username character varying(25) NOT NULL,
    password character varying(50) NOT NULL,
    phone_num character varying(10) NOT NULL
);


ALTER TABLE public.users OWNER TO brookeseiter;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: brookeseiter
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO brookeseiter;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: brookeseiter
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: favorite_stops favorite_stop_id; Type: DEFAULT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.favorite_stops ALTER COLUMN favorite_stop_id SET DEFAULT nextval('public.favorite_stops_favorite_stop_id_seq'::regclass);


--
-- Name: reviews review_id; Type: DEFAULT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);


--
-- Name: routes route_id; Type: DEFAULT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.routes ALTER COLUMN route_id SET DEFAULT nextval('public.routes_route_id_seq'::regclass);


--
-- Name: stop_categories stop_category_id; Type: DEFAULT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.stop_categories ALTER COLUMN stop_category_id SET DEFAULT nextval('public.stop_categories_stop_category_id_seq'::regclass);


--
-- Name: stops stop_id; Type: DEFAULT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.stops ALTER COLUMN stop_id SET DEFAULT nextval('public.stops_stop_id_seq'::regclass);


--
-- Name: stops_on_route stop_on_route_id; Type: DEFAULT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.stops_on_route ALTER COLUMN stop_on_route_id SET DEFAULT nextval('public.stops_on_route_stop_on_route_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: favorite_stops; Type: TABLE DATA; Schema: public; Owner: brookeseiter
--

COPY public.favorite_stops (favorite_stop_id, user_id, stop_id) FROM stdin;
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: brookeseiter
--

COPY public.reviews (review_id, rating, review_content, user_id, stop_id) FROM stdin;
\.


--
-- Data for Name: routes; Type: TABLE DATA; Schema: public; Owner: brookeseiter
--

COPY public.routes (route_id, num_stops, route_name, total_miles, total_time, start_lat, start_lng, end_lat, end_lng, user_id) FROM stdin;
\.


--
-- Data for Name: stop_categories; Type: TABLE DATA; Schema: public; Owner: brookeseiter
--

COPY public.stop_categories (stop_category_id, stop_category_name, stop_id) FROM stdin;
\.


--
-- Data for Name: stops; Type: TABLE DATA; Schema: public; Owner: brookeseiter
--

COPY public.stops (stop_id, stop_name, miles_from_path, time_from_path, stop_lat, stop_lng, user_id) FROM stdin;
\.


--
-- Data for Name: stops_on_route; Type: TABLE DATA; Schema: public; Owner: brookeseiter
--

COPY public.stops_on_route (stop_on_route_id, route_id, stop_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: brookeseiter
--

COPY public.users (user_id, fname, lname, email, username, password, phone_num) FROM stdin;
1	Rox	Lobo	therealroxlobo@lol.com	roxxx	cowboy24	4081231234
2	Talon	Tucker	interdum.nunc@hotmail.edu	jokeranger	cTLP80KMT0QT	1318481364
3	Cadman	Joyner	in.consequat@icloud.couk	salmonwidely	ACW12TAX8GT	3772398556
4	Colin	Hansen	duis@gmail.com	saviorchildish	FWN64RFD4IF	8483427892
5	Rooney	Moss	felis@yahoo.com	grilledever	KUE32DSR4TP	1368283551
6	Sean	Wilkerson	consequat.lectus@protonmail.edu	fortunetank	INR57NGM1EA	9474321126
7	Rana	Hensley	elementum.purus@hotmail.com	showermind	MSG06WUS6MP	6025137277
8	Nissim	Houston	sed@yahoo.org	stepluxurious	FOC07GTJ5YY	7266231427
9	Olympia	Allen	varius@outlook.com	memorydebris	cowboy24	4101718462
10	Kuame	Green	pede.cras@icloud.com	greatestsallow	IOV55BRL6LX	5757150441
\.


--
-- Name: favorite_stops_favorite_stop_id_seq; Type: SEQUENCE SET; Schema: public; Owner: brookeseiter
--

SELECT pg_catalog.setval('public.favorite_stops_favorite_stop_id_seq', 1, false);


--
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: brookeseiter
--

SELECT pg_catalog.setval('public.reviews_review_id_seq', 1, false);


--
-- Name: routes_route_id_seq; Type: SEQUENCE SET; Schema: public; Owner: brookeseiter
--

SELECT pg_catalog.setval('public.routes_route_id_seq', 1, false);


--
-- Name: stop_categories_stop_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: brookeseiter
--

SELECT pg_catalog.setval('public.stop_categories_stop_category_id_seq', 1, false);


--
-- Name: stops_on_route_stop_on_route_id_seq; Type: SEQUENCE SET; Schema: public; Owner: brookeseiter
--

SELECT pg_catalog.setval('public.stops_on_route_stop_on_route_id_seq', 1, false);


--
-- Name: stops_stop_id_seq; Type: SEQUENCE SET; Schema: public; Owner: brookeseiter
--

SELECT pg_catalog.setval('public.stops_stop_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: brookeseiter
--

SELECT pg_catalog.setval('public.users_user_id_seq', 10, true);


--
-- Name: favorite_stops favorite_stops_pkey; Type: CONSTRAINT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.favorite_stops
    ADD CONSTRAINT favorite_stops_pkey PRIMARY KEY (favorite_stop_id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);


--
-- Name: routes routes_pkey; Type: CONSTRAINT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_pkey PRIMARY KEY (route_id);


--
-- Name: stop_categories stop_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.stop_categories
    ADD CONSTRAINT stop_categories_pkey PRIMARY KEY (stop_category_id);


--
-- Name: stops_on_route stops_on_route_pkey; Type: CONSTRAINT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.stops_on_route
    ADD CONSTRAINT stops_on_route_pkey PRIMARY KEY (stop_on_route_id);


--
-- Name: stops stops_pkey; Type: CONSTRAINT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.stops
    ADD CONSTRAINT stops_pkey PRIMARY KEY (stop_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: favorite_stops favorite_stops_stop_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.favorite_stops
    ADD CONSTRAINT favorite_stops_stop_id_fkey FOREIGN KEY (stop_id) REFERENCES public.stops(stop_id);


--
-- Name: favorite_stops favorite_stops_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.favorite_stops
    ADD CONSTRAINT favorite_stops_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: reviews reviews_stop_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_stop_id_fkey FOREIGN KEY (stop_id) REFERENCES public.stops(stop_id);


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: routes routes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: stop_categories stop_categories_stop_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.stop_categories
    ADD CONSTRAINT stop_categories_stop_id_fkey FOREIGN KEY (stop_id) REFERENCES public.stops(stop_id);


--
-- Name: stops_on_route stops_on_route_route_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.stops_on_route
    ADD CONSTRAINT stops_on_route_route_id_fkey FOREIGN KEY (route_id) REFERENCES public.routes(route_id);


--
-- Name: stops_on_route stops_on_route_stop_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.stops_on_route
    ADD CONSTRAINT stops_on_route_stop_id_fkey FOREIGN KEY (stop_id) REFERENCES public.stops(stop_id);


--
-- Name: stops stops_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: brookeseiter
--

ALTER TABLE ONLY public.stops
    ADD CONSTRAINT stops_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

