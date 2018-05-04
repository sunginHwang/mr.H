export const progressColor = ['green','olive','olive','blue','grey','grey','brown'];
export const pieChartColor = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
export const depositSelectInfo = [
    {
        text : '선택해주세요.',
        value : 0
    },
    {
        text : '예금',
        value : 1
    },
    {
        text : '적금',
        value : 2
    },
];

export const bckCompleteSelectInfo = [
    {
        text : '버킷리스트 의 완료 방법을 선택하세요.',
        value : 0
    },
    {
        text : '목표기간 달성',
        value : 3
    },
    {
        text : '금액 모으기',
        value : 4
    },
];

/*ㅂㅋ*/
export const InitinalBckDetailData = {
        bckIdx : 2,
        targetAmount : 300000,
        currentAmount : 90000,
        startDate : '2017-01-01',
        completeDate : '2017-08-12',
        completeType : 3,
        bckTitle : '일본여행가기',
        bckDetail : '1, 나의 단기적금, 장기적금,(국민연금 포함여부는 미지수), 예금2. 연금현황3. 회원가입시 현 나의 모은 초기 자본금 세팅 해줘야함,4. 현상태로 납입시의 3,5,10년후 나의 도달 저축 금액 지표 보여주는 기능5. 회원이 저축종류 선택 할 수 있도록6. 저축의 큰 종류 (단기, 장기 ) 는 시스템 설정으로 빼자7. 저축은 입금 버튼에서 주기적으로 할수 있도록 해주자(저축종류,금액,입금일)8. 첫 화면에 현재 나의 총 저축액, 현재까지의 돈의 성장률 차트 표기9. 내가 저축한 저축 종류별 총 합계 표기 화면 필요10. 저축 종류별 금액 변경 및 삭제기능 필요(총액에서) -> 적금 만기일 이면 삭제하고 예금 넣으니까',
        depositList : [
            {
                depositIdx : 1,
                depositDate : '2017-08-01',
                depositAmount : 20000,
            },
            {
                depositIdx : 2,
                depositDate : '2017-08-02',
                depositAmount : 30000,
            },
            {
                depositIdx : 3,
                depositDate : '2017-08-03',
                depositAmount : 40000,
            },
        ]
};

export const LoginUserSampleData = {
    userIdx : 1,
    userId : 'gommpo',
    userName : '황성인',
    userEmail : 'gommpo@naver.com'
}

/*예금 적금 상세보기 샘플 데이터*/
export const InitialPropertyDetailData = {
        propertyIdx : 1,
        propertyTitle : '적금 예금 들어보자!',
        startDate : '2017-04-13',
        completeDate : '2018-04-13',
        targetAmount : 100000000,
        depositType : 2,
        saveMoneyList : [
            {
                depositIdx : 1,
                depositDate : '2017-08-01',
                depositAmount : 20000
            },
            {
                depositIdx : 2,
                depositDate : '2017-09-02',
                depositAmount : 30000
            },
            {
                depositIdx : 3,
                depositDate : '2017-10-03',
                depositAmount : 40000
            },
        ]
}

export const InitinalAssetsData = {
    propertyMoneyList : [
        {
            date : '2017-02',
            totalMoney : '30000'
        },
        {
            date : '2017-03',
            totalMoney : '40000'
        },
        {
            date : '2017-04',
            totalMoney : '33000'
        },
        {
            date : '2017-05',
            totalMoney : '50000'
        },
        {
            date : '2017-06',
            totalMoney : '80000'
        }
    ],
    propertyList : [
        {
            propertyIdx : 1,
            propertyStartDate : '2017-06-01',
            propertyTitle : '적금명',
            propertyEndDate : '2017-08-01',
            propertyTargetAmount : 20000,
            propertyCurrentAmount : 10000,
        },
        {
            propertyIdx : 1,
            propertyStartDate : '2017-06-01',
            propertyTitle : '적금명2',
            propertyEndDate : '2017-08-01',
            propertyTargetAmount : 20000,
            propertyCurrentAmount : 10000,
        },
        {
            propertyIdx : 1,
            propertyStartDate : '2017-06-01',
            propertyTitle : '적금명3',
            propertyEndDate : '2017-08-01',
            propertyTargetAmount : 20000,
            propertyCurrentAmount : 10000,
        }
    ]
};

export const InitinalBckModifyData = {
    bckIdx : 2,
    targetAmount : 300000,
    currentAmount : 90000,
    completeDate : '2017-08-12',
    completeType : 4,
    bckTitle : '일본여행가기',
    bckDetail : '1, 나의 단기적금, 장기적금,(국민연금 포함여부는 미지수), 예금2. 연금현황3. 회원가입시 현 나의 모은 초기 자본금 세팅 해줘야함,4. 현상태로 납입시의 3,5,10년후 나의 도달 저축 금액 지표 보여주는 기능5. 회원이 저축종류 선택 할 수 있도록6. 저축의 큰 종류 (단기, 장기 ) 는 시스템 설정으로 빼자7. 저축은 입금 버튼에서 주기적으로 할수 있도록 해주자(저축종류,금액,입금일)8. 첫 화면에 현재 나의 총 저축액, 현재까지의 돈의 성장률 차트 표기9. 내가 저축한 저축 종류별 총 합계 표기 화면 필요10. 저축 종류별 금액 변경 및 삭제기능 필요(총액에서) -> 적금 만기일 이면 삭제하고 예금 넣으니까'
};

export const InitinalBlListData2 = [
    {
        bckIdx : 1,
        targetAmount : 300000,
        currentAmount : 150000,
        completeDate : '2017-08',
        bckTitle : '일본여향1'
    },
    {
        bckIdx : 2,
        targetAmount : 800000,
        currentAmount : 500000,
        completeDate : '2018-01',
        bckTitle : '초합금혼사기2'
    },
    {
        bckIdx : 3,
        targetAmount : 100000,
        currentAmount : 30000,
        completeDate : '2017-12',
        bckTitle : '넬콘서트예약3'
    },
    {
        bckIdx : 4,
        targetAmount : 30000000,
        currentAmount : 1753200,
        completeDate : '2018-08',
        bckTitle : '적금넣기4'
    },
    {
        bckIdx : 5,
        targetAmount : 300000,
        currentAmount : 150000,
        completeDate : '2017-08',
        bckTitle : '일본여행5'
    },
    {
        bckIdx : 6,
        targetAmount : 300000,
        currentAmount : 300000,
        completeDate : '2017-08',
        bckTitle : '일본여행5'
    }

];
/* 버킷리스트 리스트 뷰 샘플 로드 데이터*/
export const InitinalBlListData = [
    {
        bckIdx : 1,
        targetAmount : 300000,
        currentAmount : 150000,
        startDate : '2017-04-13',
        completeDate : '2017-08-15',
        completeType : 3,
        bckTitle : '일본기간완료'
    },
    {
        bckIdx : 2,
        targetAmount : 800000,
        currentAmount : 500000,
        startDate : '2017-01-13',
        completeDate : '2018-01-01',
        completeType : 4,
        bckTitle : '초합금혼돈진행'
    },
    {
        bckIdx : 3,
        targetAmount : 100000,
        currentAmount : 30000,
        startDate : '2017-04-13',
        completeDate : '2017-12-08',
        completeType : 3,
        bckTitle : '콘서트예약기간진행'
    },
    {
        bckIdx : 4,
        targetAmount : 30000000,
        currentAmount : 1753200,
        startDate : '2017-07-13',
        completeDate : '2018-08-23',
        completeType : 4,
        bckTitle : '적금넣기돈진행'
    },
    {
        bckIdx : 5,
        targetAmount : 300000,
        currentAmount : 150000,
        startDate : '2016-04-13',
        completeDate : '2017-08-25',
        completeType : 3,
        bckTitle : '성인기간완료'
    },
    {
        bckIdx : 6,
        targetAmount : 300000,
        currentAmount : 300000,
        startDate : '2017-04-01',
        completeDate : '2017-08-01',
        completeType : 4,
        bckTitle :'성인돈완료'
    },


];
