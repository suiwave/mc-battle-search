-- テーブル: battles
-- バトル情報を格納するテーブル

CREATE TABLE battles (
    id SERIAL PRIMARY KEY, -- ユニークなID
    title VARCHAR(255) NOT NULL, -- バトルのタイトル
    length INTEGER NOT NULL, -- バトルの長さ（秒）
    url VARCHAR(255) NOT NULL, -- バトルのURL
    tournament_name VARCHAR(255) NOT NULL, -- 大会名
    mc1 VARCHAR(255), -- バトルMC1
    mc2 VARCHAR(255), -- バトルMC2
    mc3 VARCHAR(255), -- バトルMC3
    mc4 VARCHAR(255), -- バトルMC4
    mc5 VARCHAR(255), -- バトルMC5
    mc6 VARCHAR(255) -- バトルMC6
);