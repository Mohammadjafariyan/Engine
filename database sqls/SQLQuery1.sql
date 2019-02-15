use buludco1_demo

select * from dbo.workplacePersonnels
select * from [dbo].[BiometricDatas]

SELECT 
    [Extent2].[Id] AS [Id], 
    [Extent2].[UserId] AS [UserId], 
    [Extent2].[Date] AS [Date], 
    [Extent2].[PersonnelMachineId] AS [PersonnelMachineId], 
    [Extent2].[WorkplacePersonnelId] AS [WorkplacePersonnelId], 
    [Extent2].[Name] AS [Name]
    FROM  [dbo].[WorkplacePersonnels] AS [Extent1]
    INNER JOIN [dbo].[BiometricDatas] AS [Extent2] ON ([Extent1].[Id] = [Extent2].[WorkplacePersonnelId]) AND (((DATEPART (year, [Extent2].[Date])) = (DATEPART (year, SysDateTime()))) OR ((DATEPART (year, [Extent2].[Date]) IS NULL) AND (DATEPART (year, SysDateTime()) IS NULL))) AND (((DATEPART (month, [Extent2].[Date])) = (DATEPART (month, SysDateTime()))) OR ((DATEPART (month, [Extent2].[Date]) IS NULL) AND (DATEPART (month, SysDateTime()) IS NULL))) AND (((DATEPART (day, [Extent2].[Date])) = (DATEPART (day, SysDateTime()))) OR ((DATEPART (day, [Extent2].[Date]) IS NULL) AND (DATEPART (day, SysDateTime()) IS NULL)))
    WHERE [Extent1].[WorkplaceId] = 1