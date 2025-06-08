--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Ubuntu 14.18-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.18 (Ubuntu 14.18-0ubuntu0.22.04.1)

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
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer,
    product_id integer,
    quantity integer NOT NULL,
    unit_price numeric(10,2) NOT NULL
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_items_id_seq OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    buyer_id integer,
    status character varying(50) DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id integer NOT NULL,
    order_id integer,
    transbank_token character varying(255),
    amount numeric(10,2),
    status character varying(50),
    paid_at timestamp without time zone
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payments_id_seq OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    stock integer DEFAULT 0,
    category_id integer,
    seller_id integer,
    created_at timestamp without time zone DEFAULT now(),
    imagen text
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    user_id integer,
    order_id integer,
    role character varying(10),
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT transactions_role_check CHECK (((role)::text = ANY ((ARRAY['buyer'::character varying, 'seller'::character varying])::text[])))
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transactions_id_seq OWNER TO postgres;

--
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    telefono text,
    direccion text,
    rut text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name) FROM stdin;
1	categoria 1
2	categoria 2
3	categoria 3
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, order_id, product_id, quantity, unit_price) FROM stdin;
21	21	1	1	1000.00
22	22	1	1	1000.00
23	23	1	1	1000.00
24	24	1	1	1000.00
25	25	1	1	1000.00
26	26	1	1	1000.00
27	27	1	1	1000.00
28	28	1	1	1000.00
29	29	1	1	1000.00
30	30	1	1	1000.00
31	31	1	1	1000.00
32	32	1	1	1000.00
33	33	1	1	1000.00
34	34	1	1	1000.00
35	35	1	1	1000.00
36	36	1	1	1000.00
37	37	1	1	1000.00
38	38	1	1	1000.00
39	39	4	2	2000.00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, buyer_id, status, created_at) FROM stdin;
21	5	pendiente	2025-06-05 23:57:07.630223
22	5	pendiente	2025-06-05 23:59:10.149455
23	5	pendiente	2025-06-06 00:02:15.568648
24	5	pendiente	2025-06-06 00:04:32.952768
25	5	pendiente	2025-06-06 00:14:17.924894
26	5	pendiente	2025-06-06 00:14:20.740912
27	5	pendiente	2025-06-06 00:14:29.327555
28	5	pagado	2025-06-06 00:15:07.776498
29	5	pagado	2025-06-06 00:17:09.690656
30	5	pagado	2025-06-06 00:19:53.734204
31	5	pagado	2025-06-06 00:20:47.037153
32	5	pagado	2025-06-06 00:30:30.91257
33	5	pagado	2025-06-06 00:32:03.81586
34	5	pagado	2025-06-06 00:33:39.846051
35	5	pagado	2025-06-06 00:38:00.05817
36	5	pagado	2025-06-06 00:39:21.028385
37	5	fallido	2025-06-06 00:41:18.083459
38	5	pagado	2025-06-06 00:49:23.593269
39	6	pagado	2025-06-06 22:02:45.931997
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id, order_id, transbank_token, amount, status, paid_at) FROM stdin;
19	21	01ab51af2bcef4d8d66e777988b15b5d53225d1de9f89790397dc1673b56ee91	1000.00	AUTHORIZED	2025-06-05 23:58:22.863946
20	22	01abedf8b60109822c70ccfb5b148746c1cb3eaaedb9067267de1320dcae7181	1000.00	AUTHORIZED	2025-06-05 23:59:35.715354
21	23	01abb925de66b6dd8fdb12f25534547213699109794aa74c173e6502b08c913f	1000.00	AUTHORIZED	2025-06-06 00:02:36.658071
22	24	01abb924223c8ee269558e103b27d3daff7f4465afbe9b5880c785c4d8ff368f	1000.00	AUTHORIZED	2025-06-06 00:04:54.597074
23	28	01ab88b84e474edd7fd6a218d712b6cd447eaa1465e08c0ff0b493766799d6dd	1000.00	AUTHORIZED	2025-06-06 00:15:33.131339
24	29	01abcbb99d5dcb88a69fa62f26b4cfc45e3f7c23551a09ef4305e57aec2cf726	1000.00	AUTHORIZED	2025-06-06 00:17:32.238575
25	30	01ab89d136d57efeeab0be0cd5d08bc3ca112529d8cc5d87835e2d5c6d2e1ce5	1000.00	AUTHORIZED	2025-06-06 00:20:19.457112
26	31	01ab916f9d57e8a387f05b4fc02af16c3bcbd1c641a0e25aef0dbcca638897b3	1000.00	FAILED	2025-06-06 00:24:04.529268
27	32	01ab28ee8d3d11caa7ba134e1d6c0ce07b9f845fcd747e88a1f3a3cb7566bd59	1000.00	FAILED	2025-06-06 00:31:19.428101
28	33	01ab7fc857b061d16d5011c0e2d1a4bff2c30949ce178b64b1daf7fd4e98b334	1000.00	FAILED	2025-06-06 00:32:28.554894
29	34	01ab852f6976ae88542ce11ab8677c4398b37e3c1a3f20b39b16965f092035d7	1000.00	FAILED	2025-06-06 00:34:25.390877
30	35	01abb57ec098aac0f1846194188a3a027bff88ac9171471a42491bd0b3ea2bbf	1000.00	FAILED	2025-06-06 00:38:23.781889
31	36	01abf7aaa56c1d9050a1f06b0d27376b7306af96f70e567c23dfbfdbf6cd532d	1000.00	FAILED	2025-06-06 00:39:50.101219
32	37	01ab831ccff6f122e42803a0f54e5c8942b285bcf14a093fe139367032fea589	1000.00	FAILED	2025-06-06 00:41:39.570382
33	38	01aba799ef818d93b003071bd09c66f3a59d38778725bbe35b5389b22e62d086	1000.00	AUTHORIZED	2025-06-06 00:49:50.686522
34	39	01ab7c3f353683b899d3824be7a9e02a5bc3fc9b596271fd2311845b5b3c9603	4000.00	AUTHORIZED	2025-06-06 22:03:35.509017
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, description, price, stock, category_id, seller_id, created_at, imagen) FROM stdin;
1	Producto A	lalala	1000.00	1	1	1	2025-06-05 23:00:51.750214	data:image/jpeg;base64,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
4	guitarra	nueva	2000.00	0	2	5	2025-06-06 21:46:03.855732	/uploads/1749260763843.png
5	bajo	usado	4000.00	0	3	6	2025-06-06 22:04:20.887002	/uploads/1749261860878.png
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (id, user_id, order_id, role, created_at) FROM stdin;
3	5	30	buyer	2025-06-06 00:20:19.465226
4	5	31	buyer	2025-06-06 00:24:04.537207
5	5	32	buyer	2025-06-06 00:31:19.435806
6	5	33	buyer	2025-06-06 00:32:28.566092
7	5	34	buyer	2025-06-06 00:34:25.398511
8	5	35	buyer	2025-06-06 00:38:23.790149
9	5	36	buyer	2025-06-06 00:39:50.108804
10	5	37	buyer	2025-06-06 00:41:39.574489
11	5	38	buyer	2025-06-06 00:49:50.693265
12	6	39	buyer	2025-06-06 22:03:35.516307
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password_hash, created_at, telefono, direccion, rut) FROM stdin;
6	juan	juan@gmail.com	$2b$10$4LfYPreRR15Jvuw7lPJ0puxWcb3wNQ/914q7f9Y3dgi1LGqVcCnHO	2025-06-05 20:04:49.565174	\N	\N	\N
7	papa	javiercontrera@gmail.com	$2b$10$xukz8afJVYvMEHi61w2BFeP2Hyt5mlTmNYuBmOtsZ0pcZC9eT2WZe	2025-06-05 20:06:11.253208	\N	\N	\N
8	lala	lala@gmail.com	$2b$10$PBvoeYGBGqMhBWZy7/wqruD3Z2ApOLHtbfzohn9.UTaMOKhn4wm5u	2025-06-05 20:08:01.339233	\N	\N	\N
5	javier1245	javier@gmail.com	$2b$10$C5fLJMnvRyYs1OV/.JffBuRRMvLfeUYMrw5hAAt8abAxlwSw3guZq	2025-06-05 10:34:08.135602	0000	123 calle	16073537-6
1	javier contreras	javiercontrerav@gmail.com	$2b$10$4LfYPreRR15Jvuw7lPJ0puxWcb3wNQ/914q7f9Y3dgi1LGqVcCnHO	2025-06-04 21:38:30.930332	\N	\N	\N
9	javier vargas	pedro@gmail.com	$2b$10$0Ey7Iio9DXwOTFil5VUsEurlapNBC7gyWWBTQNqPC5oFWdacZdCAq	2025-06-06 22:46:06.683162	123456	calle 2	1-9
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 3, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 39, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 39, true);


--
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_id_seq', 34, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 5, true);


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_id_seq', 12, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: payments payments_order_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_order_id_key UNIQUE (order_id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: orders orders_buyer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES public.users(id);


--
-- Name: payments payments_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: products products_seller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES public.users(id);


--
-- Name: transactions transactions_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: transactions transactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

